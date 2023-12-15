const winston = require('winston');

const configureLogger = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({ filename: 'logs/combined.log' }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger;
};

module.exports = configureLogger();
