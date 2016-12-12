var passport = require('passport');
var User = require('./models/Users');
var Users = User.Users;
var userModel = User.userModel;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    console.log('serializing');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializingΩ');
    Users.findById(id, function(err, user) {
        if(err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return console.log(err.message);
        }
        return done(null, user);
    })
});

passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true},
    function (req, username, password, done) {
        console.log(3);
        process.nextTick(function() {
            Users.findOne({ 'local.username' : username}, function (err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, {err : 'user already exists'})
                } else {
                    var newUser = new userModel;
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err) throw err;
                        return done(null, newUser);
                    })
                }
            })
        });
    }
));


passport.use('local-signin', new LocalStrategy(
    function(username, password, done) {
        Users.findUser(username, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

module.exports = passport;