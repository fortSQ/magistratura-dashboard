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

  /* Дашборд */
  router.get('/', isAuthenticated, function (req, res) {
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
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));

  /* РЕГИСТРАЦИЯ */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Выход из аккаунта */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // тестовая версия промотра чужого дашборда
  router.get('/user/:login', isAuthenticated, function (request, response) {
    userLogin = request.params.login;
    var User = require('../models/user');
    var Widget = require('../models/widget');
    User.findOne({login: userLogin}, function (error, user) {
      if (error) throw error;
      Widget.find({user: user._id}, function (err, widgetList) {
        console.log(user);
        console.log(widgetList);
        if (err) throw err;
        response.render('account/index', {
          user: request.user,
          widgetList: widgetList
        });
      }).sort({position: -1, create_date: -1}); // -1 - DESC
    });
  });

  return router;
};