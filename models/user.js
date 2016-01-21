var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login:      {type: String, default: ''},
    password:   {type: String, default: ''},
    name:       {type: String, default: ''},
    surname:    {type: String, default: ''},
    sex:        {type: String, default: 'male'}, // сексизм =)
    birthday:   {type: Date,   default: ''},
    city:       {type: String, default: ''}
});

// Вывод в лог логина при сохранении сущности
UserSchema.pre('save', function (next) {
    console.log(this.login);
    next();
});

var User = mongoose.model('User', UserSchema);

exports = User;