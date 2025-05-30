const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Bypass em ambiente de teste
  if (process.env.NODE_ENV === 'test') {
    // Usuário fixo para teste
    req.user = {
      id: '3df1f587-62d3-4d57-88aa-cdd1667835a2',
      name: 'Von Neuman',
      email: 'neuman@mail.com',
      role: 'lawyer',
    };
    return next();
  }

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
