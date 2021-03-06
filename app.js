var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var routes = require('./routes/index');
var constants = require('./constants');//Constants
var fs = require('fs');

var app = express();

//Usabe edit questions [needed]
global.imgTMP ="none";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
//Nowdays that use of favicon is deprecated, it's used to implement it
//on the webpage's header:
//<link rel="icon" href="favicon.ico" type="image/x-icon"/>
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('plus.google.com/+EstebanLigeroGómez'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/*Session dynamic helpers*/
app.use(function(req, res, next){
  if(!req.session.redir){
    req.session.redir = '/';
  }
  //Save path on session.redir, access to it after login
  if(!req.path.match(/\/login|\/logout|\/user/)){
    req.session.redir = req.path;
  }

  //Usable edit questions [needed]
  if( global.imgTMP !== "none" && (!req.path.match(/\/quizes\/create/)) && ((!req.path.match(/\/quizes\/\d+/)) || (req.method==="GET" && req.path.match(/\/quizes\/\d+/)) ) ){
    fs.unlink('./public/media/'+global.imgTMP);
    global.imgTMP = "none";
  }

  //req.session visible on views
  res.locals.session = req.session;
  next();
});

/* Autologout */
app.use(function(req, res, next){
  if(req.session.user){
    req.session.cookie.expires = new Date(Date.now()+constants.T_AUTOLOGOUT);
  }
  next();
});

app.use('/', routes);

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
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

module.exports = app;
