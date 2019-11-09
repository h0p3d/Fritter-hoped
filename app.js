const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const shortsRouter = require('./routes/shorts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist'))); // Note

const usersRouter = require('./routes/users');
const freetsRouter = require('./routes/freets');

app.use(session({ secret: "hoped", resave: true, saveUninitialized: true })); 

app.use('/users', usersRouter);
app.use('/freets', freetsRouter);
app.use('/', indexRouter);

module.exports = app;
