// Main starting point of application


//const router = require('./router');

let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
//let winston = require('winston');
//winston.level = 'debug';
let cors = require('cors');
// Authentication modules

// Database modules
let mongoose = require('mongoose');
let dbConfig = require('./config/db');

// Routing modules
let api = require('./routes/api');



let app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Assign routes
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;