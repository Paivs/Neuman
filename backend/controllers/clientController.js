const { User, Client } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "segredo_default";

// Buscar todos os clientes
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "created_at"],
      },
    });

    return res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Buscar cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "name", "email", "created_at"],
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { type, name, email, phone, document, case_code } = req.body;

    if (!["pf", "pj"].includes(type)) {
      return res
        .status(400)
        .json({ error: 'Tipo de cliente inválido. Use "pf" ou "pj".' });
    }

    // Gera uma senha padrão aleatória (em produção, envie por e-mail ou force alteração)
    const defaultPassword = await bcrypt.hash("neuman@123", 10)//uuidv4();

    // Cria o usuário
    const user = await User.create({
      name,
      email,
      password_hash: defaultPassword, // Em produção, hashear
      role: "client",
    });

    // Cria o cliente associado
    const client = await Client.create({
      client_type: type,
      phone,
      document,
      case_code,
      user_id: user.id,
    });

    return res.status(201).json({
      message: "Cliente criado com sucesso!",
      user,
      client,
    });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};
