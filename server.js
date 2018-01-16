var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var path = require('path');
var findByUsername = require('./db/user').findByUsername;

// Use express
var app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Use passport to authenticate
passport.use(new LocalStrategy(
    function(username, password, done) {
        findByUsername(username, password, function(err, user) {
            if (err) {
                return done(err);
            }
            else {
                return done(null, user);
            }
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        console.log("/login authenticated...");
        console.log(req.user);
        res.redirect('/dashboard');
    });

// Catch all...

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, function () {
    console.log('App listening on port 3000...');
});
