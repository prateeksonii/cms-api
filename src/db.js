const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient({ log: ['info', 'query', 'error'] });

module.exports = db;
