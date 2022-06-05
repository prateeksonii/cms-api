const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient({ log: ['info', 'query', 'error'] });

export default db;
