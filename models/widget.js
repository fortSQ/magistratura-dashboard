var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    user:           {type: Schema.ObjectId, ref: 'User'},
    message:        {type: String, default: ''},
    color:          {type: String, default: 'primary'},
    image:          {type: String, default: ''},
    position:       {type: Number, default: 0},
    create_date:    {type: Date,   default: Date.now},
    modify_date:    {type: Date,   default: Date.now}
});

// Декоратор дат
// TODO: запихать локально и каким-то макаром передавать объект сюда
var moment = require('moment');
moment.locale('ru');

// Виртуальные поля сущности (геттеры/сеттеры на них) - не записываются в базу
WidgetSchema.virtual('created')
    .get(function() {
        return moment(this.create_date).format("D MMM h:mm");
    });
WidgetSchema.virtual('modified')
    .get(function() {
        return moment(this.modify_date).format("D MMM h:mm");
    });
WidgetSchema.virtual('json')
    .get(function() {
        return {
            id:         this.id,
            message:    this.message,
            color:      this.color,
            image:      this.image,
            created:    this.created,
            modified:   this.modified
        };
    });

var Widget = mongoose.model('Widget', WidgetSchema);

module.exports = Widget;