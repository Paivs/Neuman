const {
  Document,
  DocumentVersion,
  DocumentPermission,
  User,
  CommentDocument,
  GroupDocument,
} = require("../models");
const { v4: uuidv4 } = require("uuid");
const logActivity = require("../utils/activityLogger");

// Buscar documento específico com relações
exports.findOne = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id, {
      include: [
        {
          model: DocumentVersion,
          as: "versions",
          include: [
            {
              model: User,
              as: "uploader",
              attributes: ["id", "name", "email"],
            },
          ],
        },
        {
          model: DocumentPermission,
          as: "permissions",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        { model: GroupDocument, as: "group_document" },
        {
          model: CommentDocument,
          as: "comments",
          include: [{ model: User, as: "author", attributes: ["id", "name"] }],
          order: [["created_at", "DESC"]],
        },
      ],
    });

    if (!document || document.is_archived) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar documento" });
  }
};

// Criar documento + versão + permissão + log
exports.create = async (req, res) => {
  try {
    const { title, description, file_url, size, type, group_document_id } = req.body;
    const owner_id = req.user.id;
    const tenant_id = req.user.tenant_id || uuidv4();

    // 1. Criar documento
    const document = await Document.create({
      title,
      description,
      owner_id,
      tenant_id,
      group_document_id,
    });

    if (!file_url) {
      return res.status(400).json({
        message: "file_url é obrigatório para criar a versão do documento",
      });
    }

    // 2. Criar primeira versão
    const version = await DocumentVersion.create({
      document_id: document.id,
      version_number: 1,
      file_url,
      uploaded_by: owner_id,
      size,
      type,
      last_modified: new Date(),
    });

    // 3. Atualizar documento com versão atual
    document.current_version_id = version.id;
    await document.save();

    // 4. Criar permissão de edição para dono
    await DocumentPermission.create({
      document_id: document.id,
      user_id: owner_id,
      permission: "edit",
    });

    // 5. Log
    await logActivity({
      userId: owner_id,
      action: "create_document",
      documentId: document.id,
      description: `Documento "${title}" criado pelo usuário ${owner_id}`,
    });

    // 6. Buscar documento criado com relações
    const createdDocument = await Document.findByPk(document.id, {
      include: [
        { model: DocumentVersion, as: "versions" },
        { model: DocumentPermission, as: "permissions" },
        { model: GroupDocument, as: "group_document" },
      ],
    });

    res.status(201).json(createdDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar documento" });
  }
};

// Atualizar título e descrição
exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const document = await Document.findByPk(id);

    if (!document || document.is_archived) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    document.title = title || document.title;
    document.description = description || document.description;

    await document.save();

    await logActivity({
      userId: req.user.id,
      action: "update_document",
      documentId: id,
      description: `Documento "${document.title}" atualizado pelo usuário ${req.user.id}`,
    });

    const updatedDocument = await Document.findByPk(id, {
      include: [
        { model: DocumentVersion, as: "versions" },
        { model: DocumentPermission, as: "permissions" },
        { model: GroupDocument, as: "group_document" },
      ],
    });

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar documento" });
  }
};

// Arquivar documento (soft delete)
exports.archive = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);
    if (!document || document.is_archived) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    document.is_archived = true;
    await document.save();

    await logActivity({
      userId: req.user.id,
      action: "archive_document",
      documentId: id,
      description: `Documento "${document.title}" arquivado pelo usuário ${req.user.id}`,
    });

    res.json({ message: "Documento arquivado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao arquivar documento" });
  }
};

// Adicionar nova versão com comentário opcional
exports.addVersion = async (req, res) => {
  try {
    const { id } = req.params;
    const { file_url, size, type, comment } = req.body;
    const uploaded_by = req.user.id;

    if (!file_url) {
      return res.status(400).json({ message: "file_url é obrigatório" });
    }

    const document = await Document.findByPk(id, {
      include: [{ model: DocumentVersion, as: "versions" }],
    });

    if (!document) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }
    if (document.is_archived) {
      return res.status(404).json({ message: "Documento arquivado" });
    }

    const latestVersionNumber = document.versions.length
      ? Math.max(...document.versions.map((v) => v.version_number))
      : 0;

    const newVersion = await DocumentVersion.create({
      document_id: id,
      version_number: latestVersionNumber + 1,
      file_url,
      uploaded_by,
      size,
      type,
      last_modified: new Date(),
    });

    document.current_version_id = newVersion.id;
    await document.save();

    if (comment && comment.trim()) {
      const newComment = await CommentDocument.create({
        document_id: id,
        version_id: newVersion.id,
        author_id: uploaded_by,
        content: comment.trim(),
      });

      await logActivity({
        userId: uploaded_by,
        action: "create_comment",
        documentId: id,
        versionId: newVersion.id,
        commentId: newComment.id,
        description: `Comentário adicionado pelo usuário ${uploaded_by} na nova versão do documento "${document.title}"`,
      });
    }

    await logActivity({
      userId: uploaded_by,
      action: "add_version",
      documentId: id,
      versionId: newVersion.id,
      description: `Nova versão (#${newVersion.version_number}) adicionada pelo usuário ${uploaded_by} ao documento "${document.title}"`,
    });

    res.status(201).json(newVersion);
  } catch (error) {
    console.error("Erro ao adicionar nova versão:", error);
    res.status(500).json({ message: "Erro ao adicionar nova versão" });
  }
};
