var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var exphbs = require('express-handlebars');

var app = express();

var fileUpload = require('express-fileupload');
var db =require('./config/connection')
var session = require('express-session')
// view engine setup



const hbs= exphbs.create({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir:__dirname+'/views/layout/',
  partialsDir:__dirname+'/views/partials'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use(session({secret:"Key",cookie:{maxAge:60000}}))

db.connect((err)=>{
  if(err) console.log("connection error"+err);
  else console.log("database connected at port 27017");
})



// db.connect()
//   .then(() => console.log('database connected at port 27017'))
//   .catch((err) => console.error('connection error:', err));


  
app.use('/', userRouter);
app.use('/admin', adminRouter);




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

module.exports = app;
