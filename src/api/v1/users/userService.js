const { default: db } = require('../../../db');

module.exports = {
  createUser: (fullName, email, password) =>
    db.user.create({
      data: {
        fullName,
        email,
        password,
      },
    }),
  findUserByEmail: (email) =>
    db.user.findFirst({
      where: { email },
    }),
};
