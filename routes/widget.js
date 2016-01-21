var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var Widget = require('../models/widget');

router.get('/', function (request, response) {
    widgetId = new ObjectID(request.query.id);
    Widget.findById(widgetId, function (err, widget) {
        if (err) throw err;
        response.json(toJson(widget));
    });
});

router.put('/', function (request, response) {
    widget = new Widget();
    //widget.image = request.body.image;
    //widget.color = request.body.color;
    //widget.message = request.body.message;
    widget = setWidgetFieldsFromRequest(widget, request);
    widget.user = request.user.id;
    widget.save(function (err, widget) {
        console.log(widget);
        if (err) throw err;
        //response.json(toJson(widget));
        response.render('widget/item', {widget: widget});
    });
});

router.post('/', function (request, response) {
    widgetId = new ObjectID(request.body.id);
    userId = new ObjectID(request.user.id);
    Widget.findOne({_id: widgetId, user: userId}, function (err, widget) {
        if (err) throw err;
        widget = setWidgetFieldsFromRequest(widget, request);
        widget.modify_date = Date.now();
        widget.save();
        response.json(toJson(widget));
    });
});

var setWidgetFieldsFromRequest = function (widget, request) {
    console.log(request.body);
    if (request.body.image) widget.image = request.body.image;
    if (request.body.color) widget.color = request.body.color;
    if (request.body.message) widget.message = request.body.message;
    return widget;
};

router.delete('/', function (request, response) {
    widgetId = new ObjectID(request.body.id);
    userId = new ObjectID(request.user.id);
    Widget.findOne({_id: widgetId, user: userId}, function (err, widget) {
        if (err) throw err;
        widget = setWidgetFieldsFromRequest(widget, request);
        widget.remove(function (err) {
            if (err) throw err;
            response.json({id: request.body.id});
        });
    });
});

var toJson = function (widget) {
    return {
        id: widget.id,
        message: widget.message,
        color: widget.color,
        image: widget.image,
        created: widget.created,
        modified: widget.modified
    };
};

module.exports = router;