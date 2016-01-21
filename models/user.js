var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: { type: String, default: '' },
    password: { type: String, default: '' },
    name: { type: String, default: '' },
    surname: { type: String, default: '' },
    sex: { type: String, default: '' },
    birthday: { type: Date, default: '' },
    city: { type: String, default: '' }
});

var moment = require('moment');
moment.locale('ru');

UserSchema.virtual('birthdate')
    .get(function () {
        return moment(this.birthday).format('YYYY-MM-DD');
    })
    .set(function (birthdate) {
        this.birthday = moment(birthdate, 'YYYY-MM-DD').format();
    });

// Вывод в лог логина при сохранении сущности
UserSchema.pre('save', function (next) {
    console.log(this.login);
    next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;