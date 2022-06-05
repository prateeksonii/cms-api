const userRouter = require('express').Router();
const { createUser } = require('./userController');

userRouter.post('/', createUser);

module.exports = userRouter;
