const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize } = format;

// Formato customizado para logs
const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info', // mínimo nível para logar
  format: combine(
    colorize(), // cores no console
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // mostra stack trace para erros
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),  // só erros
    new transports.File({ filename: 'logs/combined.log' })  // todos logs info e acima
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })  // logs de exceções não capturadas
  ]
});

module.exports = logger;
