import http from 'http';
import express from 'express';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import passport from 'passport';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import register from 'ignore-styles';
import config from './config';
register(['.sass', '.scss']);

var app = express();
app.use(express.static(__dirname + '/src/dist'));
app.use(express.static(__dirname + '/src'));
app.set('views', __dirname + '/src/dist');
app.use(favicon(__dirname + '/favicon.ico'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(config.db, {useMongoClient: true}, (err) => {
	if (err) throw err;
	console.log('mongodb connected');
});

app.use(session({
	secret: 'keyboard cat',
 	resave: true,
	saveUninitialized: true,
  	cookie: { maxAge: 2592000000, secure: false },
  	store: new MongoStore({
		url: config.db
	})
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// passport.js stuff
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// models
fs.readdirSync(__dirname + '/models').forEach(file => {
	if (file.match(/\.js$/) !== null) {
		require(__dirname + '/models/' + file);
	}
});

// helpers
global.helpers = {};
fs.readdirSync(__dirname + '/helpers').forEach(function (file) {
    if (file.match(/\.js$/) !== null) {
        var name = file.replace('.js', '');
        global.helpers[name] = require(__dirname + '/helpers/' + file);
    }
});

// controllers
fs.readdirSync(__dirname + '/controllers').forEach(file => {
	if (file.match(/\.js$/) !== null) {
		var name = file.replace('.js', '');
		if (['auth'].indexOf(name) > -1) {
			app.use('/auth', require(__dirname + '/controllers/' + file));
		} else {
			app.use('/', require(__dirname + '/controllers/' + file));
		}
	}
});

app.use((err, req, res, next) => {
	res.status(400).send(err);
	next();
});

var server = http.createServer(app);
server.listen(config.port, config.host, function() {
	console.log(`server connected on port ${this.address().port}`);
});