require('dotenv').config();
// Define Dependencies
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const bodyParser = require('body-parser');

// Define Express Application
var app = express();

// JWT Middleware Configuration
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS512'], 
    requestProperty: 'user',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

// Define Routers
const indexRouter = require('../app/routes/index.js');
const usersRouter = require('../app/routes/users.js');
const contactRoute = require('../app/routes/contact.js');
const groupRoute = require('../app/routes/group');
const postRoute= require('../app/routes/post.js');
const searchRoute = require('../app/routes/search.js');

// Define Middleware Routes
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define Page Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRoute);
app.use('/groups', requireSignIn, groupRoute);
app.use('/posts', postRoute);
app.use('/search', searchRoute);

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