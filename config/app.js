// Define Dependencies
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');

// Define Express Application
var app = express();

// Define Routers
const indexRouter = require('../app/routes/index.js');

// Define Middleware Routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Define Page Routes
app.use('/', indexRouter);

// Catch Error 404
app.use(function (req, res, next) { next(createError(404)); });

// Error Handler
app.use(function (error, req, res, next) {
    console.log(error);
    // Send Error Response
    res.status(error.status || 500);
    res.json({ success: false, message: error.message });
});

//Export Module
module.exports = app;