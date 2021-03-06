var express=require('express');
var path=require('path');
var favicon=require('serve-favicon');
var logger=require('morgan');
var bodyParser=require('body-parser');
var formidable=require('express-formidable');
var fileUpload=require('express-fileupload');
var fs=require('fs')
var orders=require('./routes/orders');

var auth=require('./routes/auth');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/hotelbooking').then((data)=>console.log('Successfully connected to mongo')).
catch((err)=>{
  console.log('Something went wrong', err);
});

var Hotel=require('./routes/hotel');
var app=express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/hotel', Hotel);
app.use('/api/auth', auth);
app.use('/api/orders', orders);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;