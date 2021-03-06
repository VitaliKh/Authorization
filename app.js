
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');// Using the flash middleware provided by connect-flash to store messages in session and displaying in templates

var passport = require('passport');
var expressSession = require('express-session');
//var SessionStore = require('express-mysql-session')(expressSession);// might need on prod

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Configuring Passport
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    /*store: new SessionStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'authorize'
    })*/
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./boot/passport/init');
initPassport(passport);



var routes = require('./routes/index')(passport);
app.use('/', routes);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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


module.exports = app;
