const {
  Document,
  DocumentVersion,
  DocumentPermission,
  User,
  Sequelize,
} = require("../models");

exports.findAll = async (req, res) => {
  try {
    const userId = req.user.id; // Ou use req.params.id se for por rota
    const documents = await Document.findAll({
      where: { owner_id: userId },
      include: [
        {
          model: DocumentVersion,
          as: "versions",
          order: [["created_at", "DESC"]],
        },
        {
          model: DocumentPermission,
          as: "permissions",
          attributes: ["id", "permission", "user_id", "created_at"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(documents);
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    res.status(500).json({ message: "Erro ao buscar documentos do usuário" });
  }
};

// Buscar um usuario específico (com relações)
exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};

exports.findAllClients = () => {
  return User.findAll({
    where: { role: "client" },
    attributes: [
      "id",
      "name",
      "email",
      [
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM documents
          WHERE documents.owner_id = "User".id
        )`),
        "caseCount",
      ],
    ],
  });
};
