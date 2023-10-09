/**
* Module dependencies.
*/
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'tms'
 });
connection.connect();
global.db = connection;
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
 cookie: { maxAge: 60000 }
}))
// development only
app.get('/', routes.index);//call for main index page
app.get('/submit', user.makeApp);
app.post('/appointment', user.sendMail);
app.get('/task', routes.submit);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile',user.profile);
//Middleware
app.listen(8080)