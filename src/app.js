const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middlewares');

const app = express();

// Required middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// not found middleware
app.all('*', notFoundHandler);

// error handler
app.use(errorHandler);

module.exports = app;
