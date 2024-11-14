const logger = require("../Utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(
    `Error processing request: ${req.method} ${req.url} - ${err.message}`,
    {
      stack: err.stack,
    }
  );
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";
  const data = process.env.NODE_ENV === "production" ? undefined : err.stack;

  res.status(statusCode).json({
    success: false,
    message,
    data,
  });
};

module.exports = errorHandler;
