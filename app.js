var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var env = require('dotenv').config();
var userRouting = require('./routes/user');
var loginRouting = require('./routes/login');
var registerRouting = require('./routes/register');
var checkAuth = require('./routes/checkAuth');
var model = require('./model');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register',registerRouting);
app.use('/login',loginRouting);
app.use(checkAuth);
app.use("/user",userRouting);

model.sequelize.sync().then(function(){
  console.log("Sync success");
}).catch(function(err){
  console.log(err);
})
// catch 404 and forward to error handler
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
app.listen(3000, function(){
  console.log("App listen to port 3000")
})
module.exports = app;
