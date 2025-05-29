const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logActivity = require('../utils/activityLogger');


const JWT_SECRET = process.env.JWT_SECRET || "segredo_default";

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
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
      role: "lawyer",
    });

    // Log criação de usuário
    await logActivity({
      userId: user.id,
      action: 'register_user',
      description: `Usuário ${user.name} registrado com o email ${user.email}`,
    });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.status(201).json({
      message: "Usuário criado com sucesso",
      userId: user.id,
      token
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

    // Log login com sucesso
    await logActivity({
      userId: user.id,
      action: 'login_user',
      description: `Usuário ${user.name} efetuou login`,
    });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "10m" }
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
