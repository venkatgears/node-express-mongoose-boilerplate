// not found
const notfound = (req, res, next) => {
  const error = new Error(`url not found : ${req.originalurl}`);
  res.status(404);
  next(error);
};

// Error handler
const errorHandler = (err, req, res, next) => {
  const statuscode = res.statuscode == 200 ? res.statuscode : 500;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notfound };
