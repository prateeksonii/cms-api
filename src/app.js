const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middlewares');
const authRouter = require('./api/v1/auth/authRouter');
const userRouter = require('./api/v1/users/userRouter');
const blogRouter = require('./api/v1/blogs/blogRouter');

const app = express();

// Required middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

// not found middleware
app.all('*', notFoundHandler);

// error handler
app.use(errorHandler);

module.exports = app;
