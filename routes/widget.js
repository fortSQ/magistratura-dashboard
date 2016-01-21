var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var Widget = require('../models/widget');

router.get('/', function (request, response) {
    widgetId = new ObjectID(request.query.id);
    Widget.findById(widgetId, function (err, widget) {
        if (err) throw err;
        response.json(widget.json);
    });
});

router.put('/', function (request, response) {
    widget = new Widget();
    widget = setWidgetFieldsFromRequest(widget, request);
    widget.user = request.user.id;
    widget.save(function (err, widget) {
        if (err) throw err;
        // в ответ одаем отрендеренную вьюху
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
        response.json(widget.json);
    });
});

/**
 * Установка полей виджета из параметров запроса
 *
 * @param widget
 * @param request
 *
 * @returns widget
 */
var setWidgetFieldsFromRequest = function (widget, request) {
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
        widget.remove(function (err) {
            if (err) throw err;
            response.json({id: request.body.id});
        });
    });
});

module.exports = router;