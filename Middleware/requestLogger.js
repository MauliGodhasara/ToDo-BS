const logger = require("../Utils/logger");

const requestLogger = (req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    logger.info(`Response: ${req.method} ${req.url} ${res.statusCode}`);
  });

  next();
};

module.exports = requestLogger;
