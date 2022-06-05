const { hash } = require('argon2');
const db = require('../src/db');

async function main() {
  await db.user.create({
    data: {
      fullName: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: await hash(process.env.SUPERADMIN_PASSWORD, { saltLength: 12 }),
      role: 'SUPER_ADMIN',
    },
  });
}

main();
