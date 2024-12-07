// errorHandler.js

export default function errorHandler(err, req, res, next) {
  console.error(`[Error]: ${err.message}`);

  // Set default status code and error message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
