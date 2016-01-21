var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Widget = require('../models/widget');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('signup', new LocalStrategy({
                passReqToCallback: true, // allows us to pass back the entire request to the callback
                usernameField: 'login',
                passwordField: 'password'
            },
            function (req, username, password, done) {
                findOrCreateUser = function () {
                    console.log(username);
                    console.log(req.body.confirm_password);
                    // find a user in Mongo with provided username
                    User.findOne({'login': username}, function (err, user) {
                        // In case of any error, return using the done method
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log('User already exists with username: ' + username);
                            return done(null, false, req.flash('message', 'Пользователь с таким логином уже существует'));
                        } else {
                            // не совпадают пароли
                            if (req.body.confirm_password != password) {
                                return done(null, false, req.flash('message', 'Пароли не совпадают'));
                            }

                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.login = username;
                            newUser.password = createHash(password);

                            // save the user
                            newUser.save(function (err, user) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                // добавим виджет
                                var testWidget = new Widget();
                                testWidget.user = user._id;
                                testWidget.message = 'Добро пожаловать!';
                                testWidget.image = '/images/salut.jpg';
                                testWidget.save(function (err) {
                                    if (err) {
                                        console.log('Error in Saving user widget: ' + err);
                                        throw err;
                                    }
                                    console.log('Created user test widget');
                                });
                                return done(null, newUser);
                            });
                        }
                    });
                };
                // Delay the execution of findOrCreateUser and execute the method
                // in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}