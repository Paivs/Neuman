const {
  Document,
  DocumentVersion,
  DocumentPermission,
  User,
  Comment,
  Sequelize,
} = require("../models");

exports.create = async (req, res) => {
  try {
    const { document_id, version_id, content } = req.body;
    const author_id = req.user.id;

    console.log(JSON.stringify(req.body))

    if (!content || !document_id) {
      return res.status(400).json({ message: "Conteúdo e document_id são obrigatórios" });
    }

    const comment = await Comment.create({
      document_id: document_id,
      version_id: version_id,
      author_id,
      content,
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
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["created_at", "DESC"]]
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ message: "Erro ao buscar comentários" });
  }
}
