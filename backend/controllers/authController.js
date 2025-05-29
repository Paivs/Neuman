const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "segredo_default";

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Email já está em uso"
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password_hash: hash,
      role: "lawyer", // se quiser permitir escolha, valide o role no req.body
    });

    // Criar token após registro
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.status(201).json({
      message: "Usuário criado com sucesso",
      userId: user.id,
      token // Retornar token no registro também
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Erro ao criar usuário",
      error: error.message,
    });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Credenciais inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "10m" } // você pode aumentar para produção, ex: 1h ou mais
    );

    const { id, name, email: userEmail, role } = user;

    res.json({
      token,
      user: { id, name, email: userEmail, role },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro interno no servidor" });
  }
};
