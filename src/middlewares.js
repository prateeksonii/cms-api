const httpStatus = require('http-status');

exports.notFoundHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  return next(new Error(`No route found - ${req.url}`));
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, _next) => {
  // set status as 500 for unexpected error
  if (res.statusCode === httpStatus.OK) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }

  return res.json({
    ok: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : {},
    },
  });
};
