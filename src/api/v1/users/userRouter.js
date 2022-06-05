const userRouter = require('express').Router();
const { isAuthenticated, isSuperAdmin } = require('../auth/authMiddlewares');
const { createUser, getAllReaders, makeAdmin } = require('./userController');

userRouter.post('/', createUser);
userRouter.get('/', isAuthenticated, isSuperAdmin, getAllReaders);
userRouter.post('/admin/:id', isAuthenticated, isSuperAdmin, makeAdmin);

module.exports = userRouter;
