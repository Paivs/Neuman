const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
  });

  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: true, message: err.message });
};
