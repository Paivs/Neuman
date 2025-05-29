const { User, Comment, Document } = require("../models");
const logActivity = require("../utils/activityLogger");

exports.create = async (req, res) => {
  try {
    const { document_id, version_id, content } = req.body;
    const author_id = req.user.id;

    if (!content || !document_id) {
      return res
        .status(400)
        .json({ message: "Conteúdo e document_id são obrigatórios" });
    }

    const comment = await Comment.create({
      document_id,
      version_id,
      author_id,
      content,
    });

    // Busca os dados reais para descrição amigável
    const user = await User.findByPk(author_id);
    const document = await Document.findByPk(document_id);

    // Registra atividade de criação de comentário com dados legíveis
    await logActivity({
      userId: author_id,
      action: "create_comment",
      documentId: document_id,
      versionId: version_id,
      commentId: comment.id,
      description: `Comentário criado pelo usuário ${user?.name || author_id} (${author_id}) no documento "${document?.title || document_id}" (${document_id})`,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ message: "Erro ao criar comentário" });
  }
};

exports.fetchCommentsByDocumentVersionId = async (req, res) => {
  try {
    const { version_id } = req.params;

    if (!version_id) {
      return res.status(400).json({ message: "version_id é obrigatório" });
    }

    const comments = await Comment.findAll({
      where: { version_id },
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
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ message: "Erro ao buscar comentários" });
  }
};
