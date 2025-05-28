const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // 'Bearer token'

  if (!token) {
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'segredo_default';
    const decoded = jwt.verify(token, secret);

    req.user = decoded; // dados decodificados do token
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    } else {
      return res.status(403).json({ message: 'Token inválido' });
    }
  }
};

module.exports = authMiddleware;
