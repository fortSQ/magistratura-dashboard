var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user');

router.get('/', function (request, response) {
    userId = new ObjectID(request.user.id);
    User.findById(userId, function (err, user) {
        if (err) throw err;
        response.json(toJson(user));
    });
});

router.post('/', function (request, response) {
    userId = new ObjectID(request.user.id);
    User.findById(userId, function (err, user) {
        if (err) throw err;
        if (request.body.name) user.name = request.body.name;
        if (request.body.surname) user.surname = request.body.surname;
        if (request.body.city) user.city = request.body.city;
        user.save();
        response.json(toJson(user));
    });
});

var toJson = function (user) {
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        sex: user.sex,
        birthday: user.birthday,
        city: user.city
    };
};

module.exports = router;