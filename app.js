
// This block is where we require in the node_modules libraries needed to run express
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//! Important! This is where we require in the routers for our express app
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//requiring the blogs.js router 
var blogsRouter = require("./routes/blogs");

// initializing express for us
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware function for express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//! Invoking the router we create
app.use('/', indexRouter);
app.use('/users', usersRouter);

// creating 404 error pages when the url in the request does not match
// catch 404 and forward to error handler
app.use('/blogs', blogsRouter)

app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// exports the 
module.exports = app;