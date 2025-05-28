const {
  Document,
  DocumentVersion,
  DocumentPermission,
  User,
} = require("../models");
const { v4: uuidv4 } = require("uuid");

// Criar um novo documento
exports.create = async (req, res) => {
  try {

    const { title, description, file_url, size, type } = req.body;
    const owner_id = req.user.id; // vindo do token JWT
    const tenant_id = req.user.tenant_id || uuidv4(); // ajustar se necessário

    // 1. Criar o documento
    const document = await Document.create({
      title,
      description,
      owner_id,
      tenant_id,
    });

    // 2. Verificação
    if (!file_url) {
      return res.status(400).json({
        message: "file_url é obrigatório para criar a versão do documento",
      });
    }

    // 3. Criar a primeira versão
    const version = await DocumentVersion.create({
      document_id: document.id,
      version_number: 1,
      file_url,
      uploaded_by: owner_id,
      size,
      type,
      last_modified: new Date(), // Agora
    });

    // 4. Atualizar documento com a versão atual
    document.current_version_id = version.id;
    await document.save();

    // 5. Criar permissão para o dono
    await DocumentPermission.create({
      document_id: document.id,
      user_id: owner_id,
      permission: "edit",
    });

    // 6. Buscar documento completo
    const createdDocument = await Document.findByPk(document.id, {
      include: [
        { model: DocumentVersion, as: "versions" },
        { model: DocumentPermission, as: "permissions" },
      ],
    });

    res.status(201).json(createdDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar documento" });
  }
};

// Buscar todos os documentos do usuário (com versões e permissões)
exports.findAll = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const documents = await Document.findAll({
      where: { owner_id, is_archived: false },
      include: [
        { model: DocumentVersion, as: "versions" },
        { model: DocumentPermission, as: "permissions" },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar documentos" });
  }
};

// Buscar um documento específico (com relações)
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

// Atualizar um documento (título e descrição)
exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const document = await Document.findByPk(id);

    if (!document || document.is_archived) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    // Opcional: verificar permissão para edição aqui, ex: req.user.id === document.owner_id

    document.title = title || document.title;
    document.description = description || document.description;

    await document.save();

    // Recarregar documento com relações para retorno
    const updatedDocument = await Document.findByPk(id, {
      include: [
        { model: DocumentVersion, as: "versions" },
        { model: DocumentPermission, as: "permissions" },
      ],
    });

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar documento" });
  }
};

// Arquivar (soft delete) um documento
exports.archive = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);
    if (!document || document.is_archived) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    document.is_archived = true;
    await document.save();

    res.json({ message: "Documento arquivado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao arquivar documento" });
  }
};

exports.addVersion = async (req, res) => {
  try {
    const { id } = req.params; // ID do documento
    const { file_url, size, type, comment } = req.body;
    const uploaded_by = req.user.id;


    if (!file_url) {
      return res.status(400).json({ message: "file_url é obrigatório" });
    }

    const document = await Document.findByPk(id, {
      include: [{ model: DocumentVersion, as: "versions" }],
    });



    if (!document) {
      return res
        .status(404)
        .json({ message: "Documento não encontrado" });
    }
    if (document.is_archived) {
      return res
        .status(404)
        .json({ message: "Documento arquivado" });
    }

    const latestVersionNumber = document.versions.length
      ? Math.max(...document.versions.map((v) => v.version_number))
      : 0;

    // Cria nova versão
    const newVersion = await DocumentVersion.create({
      document_id: id,
      version_number: latestVersionNumber + 1,
      file_url,
      uploaded_by,
      size,
      type,
      last_modified: new Date(),
    });

    // Atualiza a versão atual do documento
    document.current_version_id = newVersion.id;
    await document.save();

    // Se comentário for fornecido, cria o comentário associado à nova versão
    if (comment && comment.trim() !== "") {
      await Comment.create({
        document_id: id,
        version_id: newVersion.id,
        author_id: uploaded_by,
        content: comment.trim(),
      });
    }

    res.status(201).json(newVersion);
  } catch (error) {
    console.error("Erro ao adicionar nova versão:", error);
    res.status(500).json({ message: "Erro ao adicionar nova versão" });
  }
};

