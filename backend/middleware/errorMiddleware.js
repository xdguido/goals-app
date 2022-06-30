const errorHandler = (err, req, res, next) => {
  const status = res.status ? res.status : 500;
  res.status(status);
  res.json({
    error: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
