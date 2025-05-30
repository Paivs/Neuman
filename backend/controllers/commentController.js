const { User, Document, GroupDocument, CommentDocument, CommentGroupDocument } = require("../models");
const logActivity = require("../utils/activityLogger");

exports.create = async (req, res) => {
  try {
    const { document_id, group_document_id, version_id, content } = req.body;
    const author_id = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Conteúdo é obrigatório" });
    }
    if (!document_id && !group_document_id) {
      return res.status(400).json({ message: "document_id ou group_document_id é obrigatório" });
    }

    let comment;
    if (document_id) {
      comment = await CommentDocument.create({
        document_id,
        version_id,
        author_id,
        content,
      });

      // Buscar dados para log
      const user = await User.findByPk(author_id);
      const document = await Document.findByPk(document_id);

      await logActivity({
        userId: author_id,
        action: "create_comment",
        documentId: document_id,
        versionId: version_id,
        commentDocumentId: comment.id, // nome exato da coluna no banco
        description: `Comentário criado pelo usuário ${user?.name || author_id} (${author_id}) no documento "${document?.title || document_id}" (${document_id})`,
      });

    } else if (group_document_id) {
      comment = await CommentGroupDocument.create({
        group_document_id,
        author_id,
        content,
      });

      // Buscar dados para log
      const user = await User.findByPk(author_id);
      const groupDocument = await GroupDocument.findByPk(group_document_id);

      console.log({
        userId: author_id,
        action: "create_comment",
        groupDocumentId: group_document_id,        // camelCase
        commentGroupDocumentId: comment.id,        // camelCase
        description: `Comentário criado pelo usuário ${user?.name || author_id} (${author_id}) no grupo de documentos "${groupDocument?.title || group_document_id}" (${group_document_id})`,
      })

      await logActivity({
        userId: author_id,
        action: "create_comment",
        groupDocumentId: group_document_id,        // camelCase
        commentGroupDocumentId: comment.id,        // camelCase
        description: `Comentário criado pelo usuário ${user?.name || author_id} (${author_id}) no grupo de documentos "${groupDocument?.title || group_document_id}" (${group_document_id})`,
      });
      
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ message: "Erro ao criar comentário" });
  }
};

exports.fetchCommentsByDocumentId = async (req, res) => {
  try {
    const { document_id } = req.params;

    if (!document_id) {
      return res.status(400).json({ message: "document_id é obrigatório" });
    }

    const comments = await CommentDocument.findAll({
      where: { document_id },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários do documento:", error);
    res.status(500).json({ message: "Erro ao buscar comentários do documento" });
  }
};

exports.fetchCommentsByGroupDocumentId = async (req, res) => {
  try {
    const { group_document_id } = req.params;

    if (!group_document_id) {
      return res.status(400).json({ message: "group_document_id é obrigatório" });
    }

    const comments = await CommentGroupDocument.findAll({
      where: { group_document_id },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários do grupo de documentos:", error);
    res.status(500).json({ message: "Erro ao buscar comentários do grupo de documentos" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Tenta deletar comentário de documento
    const commentDoc = await CommentDocument.findByPk(id);
    if (commentDoc) {
      await commentDoc.destroy();
      return res.status(200).json({ message: 'Comentário de documento removido com sucesso' });
    }

    // Tenta deletar comentário de grupo de documentos
    const commentGroupDoc = await CommentGroupDocument.findByPk(id);
    if (commentGroupDoc) {
      await commentGroupDoc.destroy();
      return res.status(200).json({ message: 'Comentário de grupo de documentos removido com sucesso' });
    }

    return res.status(404).json({ message: 'Comentário não encontrado' });
  } catch (error) {
    console.error('Erro ao remover comentário:', error);
    res.status(500).json({ message: 'Erro ao remover comentário' });
  }
};
