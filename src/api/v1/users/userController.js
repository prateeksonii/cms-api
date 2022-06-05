const { hash } = require('argon2');
const httpStatus = require('http-status');
const userService = require('./userService');

exports.createUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      res.status(httpStatus.CONFLICT);
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, { saltLength: 12 });

    const user = await userService.createUser(fullName, email, hashedPassword);

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
