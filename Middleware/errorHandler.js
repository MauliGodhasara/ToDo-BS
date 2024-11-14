const errorHandler = (err, req, res, next) => {
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
