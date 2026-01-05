// Global error handler middleware
module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log full stack trace for debugging

  // Default values
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Handle common Mongoose errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};
