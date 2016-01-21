var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    message: {type: String, default: ''},
    color: {type: String, default: 'primary'},
    image: {type: String, default: ''},
    position: {type: Number, default: 0},
    create_date: {type: Date, default: Date.now},
    modify_date: {type: Date, default: Date.now}
});

var moment = require('moment');
moment.locale('ru');

WidgetSchema.virtual('created')
    .get(function() {
        return moment(this.create_date).format("D MMM h:mm");
    });
WidgetSchema.virtual('modified')
    .get(function() {
        return moment(this.modify_date).format("D MMM h:mm");
    });

var Widget = mongoose.model('Widget', WidgetSchema);

module.exports = Widget;