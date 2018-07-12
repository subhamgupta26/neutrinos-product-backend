var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var public = require('./routes/public');

var db = require('./db');

var app = express();

var User= require('./models/user');
var Product= require('./models/product');

var VerifyToken = require('./auth/VerifyToken');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', index);
app.use('/users',VerifyToken, users);
app.use('/products', VerifyToken, products);
app.use('/public', public);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//var awesome_instance = new User({ email: 'admin@gmail.com', password: 'admin', name: 'awesome' });


// var awesome_instance = new Product({ name: 'HTC1', price: '10000', imagePath: 'fileServer/images1.jpg' , productId: 'HTC01'});
// var awesome_instance1 = new Product({ name: 'HTC2', price: '20000', imagePath: 'fileServer/images2.jpg' , productId: 'HTC02'});
// var awesome_instance2 = new Product({ name: 'SAMSUNG1', price: '10000', imagePath: 'fileServer/images3.jpg' , productId: 'SAMSUNG01'});
// var awesome_instance3 = new Product({ name: 'SAMSUNG2', price: '12000', imagePath: 'fileServer/images4.jpg' , productId: 'SAMSUNG02'});
// var awesome_instance4 = new Product({ name: 'HTC3', price: '16000', imagePath: 'fileServer/images5.jpg' , productId: 'HTC03'});
// var awesome_instance5 = new Product({ name: 'ONEPLUS1', price: '30000', imagePath: 'fileServer/images6.jpg' , productId: 'ONEPLUS01'});





// //Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance1.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance2.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance3.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance4.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance5.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });

module.exports = app;
