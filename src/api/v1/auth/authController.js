const { verify } = require('argon2');
const httpStatus = require('http-status');
const jsonwebtoken = require('jsonwebtoken');
const userService = require('../users/userService');

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      throw new Error('User not found');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      res.status(httpStatus.FORBIDDEN);
      throw new Error('Invalid email or password');
    }

    const safeUser = { ...user, password: undefined };

    const token = jsonwebtoken.sign(
      { user: safeUser, sub: safeUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '10y' },
    );

    return res.json({
      ok: true,
      result: {
        user: safeUser,
        accessToken: token,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAuthenticatedUser = (req, res) =>
  res.json({
    ok: true,
    user: req.user,
  });
