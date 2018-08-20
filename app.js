var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由信息
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var loginRouter = require('./routes/login')
// var chnageUser = require('./routes/changeInfo')
var Router = require('./routes')

var app = express();
//模板开始
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.static(__dirname + '/public'));
//中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//配置路由
app.use('/', Router);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/login',loginRouter)
// app.use('/changeInfo',chnageUser)
//

//错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('not found')
    err.status = 404;
    next(err)
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

module.exports = app;
