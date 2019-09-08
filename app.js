var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/* importation mongoose */
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



/* declaration les router du database */
var platRouter = require('./routes/plats');
var RestaurantRouter = require('./routes/restaurants');


// ajouter fonction pour conncter avec expressJs

var cors = require('cors')

var app = express();
// ajouter fonction pour conncter avec expressJs
app.use(cors())
//connection base de donnees
mongoose.connect('mongodb://localhost:27017/mean-db', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


/* declaration lien des database */
app.use('/plats', platRouter);
app.use('/restaurants', RestaurantRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
