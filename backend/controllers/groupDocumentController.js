const {
  GroupDocument,
  Client,
  GroupDocumentClient,
  GroupDocumentPermission,
  Document,
  DocumentVersion,
  DocumentPermission,
  User,
  CommentGroupDocument,
  Case,
} = require("../models");
const logActivity = require("../utils/activityLogger");

// Criar grupo de documentos
exports.create = async (req, res) => {
  try {
    const { title, description, case_id, client_ids } = req.body;
    const owner_id = req.user.id;

    // Criar grupo
    const groupDocument = await GroupDocument.create({
      title,
      description,
      owner_id,
      case_id: case_id || null,
    });

    // Associar clientes (se houver)
    if (Array.isArray(client_ids) && client_ids.length > 0) {
      const clientsToAdd = client_ids.map((client_id) => ({
        group_document_id: groupDocument.id,
        client_id,
      }));
      await GroupDocumentClient.bulkCreate(clientsToAdd);
    }

    // Dar permissão total para o dono (edit)
    await GroupDocumentPermission.create({
      group_document_id: groupDocument.id,
      user_id: owner_id,
      permission: "edit",
    });

    // Log
    await logActivity({
      userId: owner_id,
      action: "create_group_document",
      description: `Grupo de documentos "${title}" criado pelo usuário ${owner_id}`,
      groupDocumentId: groupDocument.id,
    });

    res.status(201).json(groupDocument);
  } catch (error) {
    console.error("Erro ao criar grupo de documentos:", error);
    res.status(500).json({ message: "Erro ao criar grupo de documentos" });
  }
};

// Buscar grupo de documentos por id (com clientes, permissões, comentários e caso)
exports.findOne = async (req, res) => {
  try {
    const groupDocument = await GroupDocument.findByPk(req.params.id, {
      include: [
        {
          model: Client,
          as: "clients",
          through: { attributes: [] },
        },
        {
          model: GroupDocumentPermission,
          as: "permissions",
          include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
        },
        {
          model: CommentGroupDocument,
          as: "comments",
          include: [{ model: User, as: "author", attributes: ["id", "name"] }],
        },
        {
          model: Case,
          as: "case",
        },
        {
          model: Document,
          as: "documents",
          include: [
            {
              model: DocumentVersion,
              as: "versions",
            },
          ],
        },
      ],
    });

    if (!groupDocument || groupDocument.is_archived) {
      return res.status(404).json({ message: "Grupo de documentos não encontrado" });
    }

    res.json(groupDocument);
  } catch (error) {
    console.error("Erro ao buscar grupo de documentos:", error);
    res.status(500).json({ message: "Erro ao buscar grupo de documentos" });
  }
};

// Atualizar grupo de documentos (título, descrição, caso e clientes)
exports.update = async (req, res) => {
  try {
    const { title, description, case_id, client_ids } = req.body;
    const { id } = req.params;

    const groupDocument = await GroupDocument.findByPk(id);

    if (!groupDocument || groupDocument.is_archived) {
      return res.status(404).json({ message: "Grupo de documentos não encontrado" });
    }

    groupDocument.title = title || groupDocument.title;
    groupDocument.description = description || groupDocument.description;
    groupDocument.case_id = case_id || groupDocument.case_id;

    await groupDocument.save();

    // Atualizar clientes associados, se enviado array
    if (Array.isArray(client_ids)) {
      // Remove os atuais
      await GroupDocumentClient.destroy({ where: { group_document_id: id } });
      // Adiciona os novos
      const clientsToAdd = client_ids.map((client_id) => ({
        group_document_id: id,
        client_id,
      }));
      await GroupDocumentClient.bulkCreate(clientsToAdd);
    }

    res.json(groupDocument);
  } catch (error) {
    console.error("Erro ao atualizar grupo de documentos:", error);
    res.status(500).json({ message: "Erro ao atualizar grupo de documentos" });
  }
};

// Arquivar grupo de documentos
exports.archive = async (req, res) => {
  try {
    const { id } = req.params;

    const groupDocument = await GroupDocument.findByPk(id);
    if (!groupDocument || groupDocument.is_archived) {
      return res.status(404).json({ message: "Grupo de documentos não encontrado" });
    }

    groupDocument.is_archived = true;
    await groupDocument.save();

    await logActivity({
      userId: req.user.id,
      action: "archive_group_document",
      groupDocumentId: id,
      description: `Grupo de documentos "${groupDocument.title}" arquivado pelo usuário ${req.user.id}`,
    });

    res.json({ message: "Grupo de documentos arquivado com sucesso" });
  } catch (error) {
    console.error("Erro ao arquivar grupo de documentos:", error);
    res.status(500).json({ message: "Erro ao arquivar grupo de documentos" });
  }
};

// Listar grupos do usuário dono (não arquivados)
exports.findByOwner = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const groups = await GroupDocument.findAll({
      where: { owner_id, is_archived: false },
      include: [
        {
          model: Client,
          as: "clients",
          through: { attributes: [] },
        },
        {
          model: Case,
          as: "case",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(groups);
  } catch (error) {
    console.error("Erro ao buscar grupos de documentos:", error);
    res.status(500).json({ message: "Erro ao buscar grupos de documentos" });
  }
};
