var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) return next();
  // если не авторизован - кидаем на логин
  res.redirect('/login');
};

module.exports = function (passport) {

  /* Страница входа */
  router.get('/', function (req, res) {
    res.redirect('/login');
  });

  router.get('/login', function (req, res) {
    res.render('index', {
      message: req.flash('message'),
      tab: 'login'
    });
  });

  router.get('/signup', function (req, res){
      res.render('index',{
          message: req.flash('message'),
          tab: 'signup'
      });
  });

  /* ЛОГИН */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* РЕГИСТРАЦИЯ */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Собственно, дашборд */
  router.get('/home', isAuthenticated, function(req, res){
    userId = req.user._id;
    var Widget = require('../models/widget');
    Widget.find({user: userId}, function (err, widgetList) {
      if (err) throw err;
      res.render('account/index', {
          user: req.user,
          widgetList: widgetList
      });
    }).sort({position: -1, create_date: -1}); // -1 - DESC
  });

  /* Выход из аккаунта */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};