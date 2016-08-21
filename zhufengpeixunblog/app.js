var express = require('express');

var path = require('path');//处理文件路径 jbin resolve
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//是一个访问工具
var cookieParser = require('cookie-parser');//处理cookie，增加req.cookies属性
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');

var app = express();

// view engine setup 设置模板引擎
app.set('views', path.join(__dirname, 'views'));//设置模板存放目录
app.set('view engine', 'html');//设置模板引擎
app.engine('html',require('ejs').__express);//设置渲染函数

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//使用请求中间件
//通过请求头中的content-type=application/json req.body=JSON.parse(请求体);
//用来处理urlencoded
app.use(bodyParser.json());//用来处理请求格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//当路径由/开头，创建一个route
app.use('/', routes);
//当由/user开头，创建一个路由器
app.use('/user', user);
app.use('/article', article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
