//var express = require('express');
//var router = express.Router();
//
//var User = require('../models/user');
//
//var md5 = require('md5');
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//  var k = new User();
//  k.save(function (err) {
//    if (err) console.log('meow');
//  });
//  res.render('index', { title: 'Express' });
//});
//
//
//router.post('/signup', function(req, res, next) {
//  email = req.body.email;
//  password = req.body.password;
//  confirmPassword = req.body.confirm_password;
//  if (password == confirmPassword) {
//    console.log(md5(password));
//    // в базу
//  }
//  console.log(email);
//  res.render('index', { title: 'Express' });
//});
//
//
//
//module.exports = router;












var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    //res.render('index', { message: req.flash('message') });
    res.redirect('/login');
  });

  router.get('/login', function(req, res){
    res.render('index', {
      message: req.flash('message'),
      tab: 'login'
    });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('index',{
      message: req.flash('message'),
      tab: 'signup'
    });
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    userId = req.user._id;
    var Widget = require('../models/widget');
    Widget.find({user: userId}, function (err, widgetList) {
      if (err) throw err;
      console.log(widgetList);
      //res.render('index-old', { user: req.user, widgetList: widgetList });
      res.render('account/index', { user: req.user, widgetList: widgetList });
    });
    //res.render('index-old', { user: req.user });
  });

  /* Handle Logout */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
