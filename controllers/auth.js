import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';

const LocalStrategy = require('passport-local').Strategy;
const router = module.exports = express.Router();
const User = mongoose.model('User');

passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username'});

            return done(null, user);
        });
    }
));

router.post('/', (req, res) => {    
    if (!req.isAuthenticated()) return res.send({isAuth: false});
    res.send({isAuth: true, username: req.user.username});
});

router.post('/signup', (req, res, next) => {
    if (!/[a-zA-Z\s]{3,40}/.test(req.body.username))  return next({
        status: 'error',
        message: 'Username is incorrect'
    });

    if (!/\S+@\S+\.\S+/.test(req.body.email))  return next({
        status: 'error',
        message: 'E-mail address is incorrect'
    });

    if (!/[^\\s]{3,40}/.test(req.body.password))  return next({
        status: 'error',
        message: 'Password is incorrect'
    });

	passport.authenticate('local', (err, user) => {
		if (err) return next(err);
        if (!err) {
            User.findOne({ $or: 
                        [
                            {username: req.body.username},
                            {email: req.body.email}
                        ] 
                    })
                    .exec()
                    .then(findUser => {
                        if (findUser && findUser.email === req.body.email)  return next({
                            status: 'error',
                            message: 'E-mail address already registered'
                        });
                        if (findUser && findUser.username === req.body.username)  return next({
                            status: 'error',
                            message: 'Username already registered'
                        });
                        new User({
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        }).save((err, user) => {
                        	if (err) return next(err);
                            req.logIn(user, err => {
                            	if (err) return next(err);
                                res.send({
                                    success: true,
                                    message: 'User Created',
                                    data: {
                                        name: req.body.name,
                                        username: req.body.username,
                                        email: req.body.email
                                    }
                                });
                            });
                        });
                    })
                    .catch(err => {
                        return next(err);
                    });
        }
    })(req, res, next);
});

// login
router.post('/signin', (req, res, next) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        if (!user) return next({
            status: 'error',
            message: 'username or password incorrect'
        });        

        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            req.logIn(user, err => {
                res.send({
                    success: true,
                    message: `Welcome ${req.body.username}`,
                    data: {
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email
                    }
                });
            });
        })(req, res, next);
    });
});

// logout
router.get('/signout', (req, res) => {  
    req.logout();
    res.redirect('/');
});

router.post('/signout', (req, res) => {  
    req.logout();
    res.redirect('/');
});

// user data
router.post('/user', helpers.auth('user'), (req, res) => {
    res.send({
        success: true,
        data: {
            username: req.user.username
        }
    })
});