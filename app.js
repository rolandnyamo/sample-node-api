var createError = require('http-errors');
var express = require('express');
var path = require('path');
const appInsights = require("applicationinsights");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var r = require('./utils/methods')

/*
Azure Monitor setup
https://docs.microsoft.com/en-us/azure/azure-monitor/app/create-new-resource#copy-the-instrumentation-key
*/

var instrumentationKey = process.env.INSTR_KEY || "none"

appInsights.setup(instrumentationKey);
appInsights.start();
// END Azure monitor setup


var indexRouter = require('./routes/index');
var pathRouter = require('./routes/path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/path', pathRouter);


// stupic favicon error
app.get('/favicon.ico', function(req, res, next) {
  
  res.status(200).json({res: ' no icon'});
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var context = r(req)
  // render the error page
  res.status(400);
  context.status = {error: 400};
  console.log(context)
  res.json(context);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  var context = r(req)
  // render the error page
  res.status(err.status || 500);
  context.status = {error: 500};
  console.log(context)
  res.json(context);
});

module.exports = app;
