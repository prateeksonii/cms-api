const authRouter = require('express').Router();
const { signIn, getAuthenticatedUser } = require('./authController');
const { isAuthenticated } = require('./authMiddlewares');

authRouter.post('/signin', signIn);
authRouter.get('/me', isAuthenticated, getAuthenticatedUser);

module.exports = authRouter;
