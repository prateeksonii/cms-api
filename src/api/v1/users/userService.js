const db = require('../../../db');

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
  findAllReaders: () =>
    db.user.findMany({
      where: {
        role: 'READER',
      },
    }),
  makeAdmin: (userId) =>
    db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: 'ADMIN',
      },
    }),
};
