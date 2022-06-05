const httpStatus = require('http-status');
const jsonwebtoken = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(httpStatus.UNAUTHORIZED);
      throw new Error('No token provided');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED);
      throw new Error('Invalid token provided');
    }

    try {
      const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = payload.user;
      return next();
    } catch (err) {
      res.status(httpStatus.UNAUTHORIZED);
      throw new Error('Invalid token provided');
    }
  } catch (err) {
    return next(err);
  }
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role === 'ADMIN') return next();

  res.status(httpStatus.UNAUTHORIZED);
  return next(new Error('This action requires admin privilege'));
};

exports.isSuperAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role === 'SUPER_ADMIN') return next();

  res.status(httpStatus.UNAUTHORIZED);
  return next(new Error('This action requires super admin privilege'));
};
