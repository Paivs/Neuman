class AppError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status || 500;
    this.details = details || null;
  }
}

module.exports = AppError;
