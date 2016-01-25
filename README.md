# Курсовая работа NodeJS + MongoDB

## Установка
* MongoDB
* `npm i`

## Запуск
1. mongo.bat
2. run.bat

## Интеграция в PhpStorm
Открыть *Run/Debug Configurations* -> *Node.js* и указать `JavaScript file` **bin/www**.

Монго пока не придумал, в *before scripts* куда-то надо, но чтоб один инстанс, если запущен

## История
1. Скачал и поставил установщик Node.js за версией 5, где поддерживается плоская структура модулей *node_modules* (внутри пакетов только если версия отличается)
2. Поставил MongoDB также через установщик, запустил `mongod.exe` - саму базу (она без логина-пароля)
3. Т.к. изначально пробовался готовый фреймворк MEAN, для компиляции некоторых пакетов требовался Python 2.7 и компилятор С, скачал Visual Studio 2015 (как оказывается, community-версия бесплатна), в которой создал новый С++ проект, что и скачал необходимые зависимости (видите ли по умолчанию они не ставятся сразу) - идею взял из [stackoverflow](http://stackoverflow.com/questions/33239445/could-not-install-prerender-using-npm-failed-to-locate-cl-exe)
4. Также помогли ссылки по: [схемам mongoose](http://mongoosejs.com/docs/guide.html), [внешним ключам Mongo](http://stackoverflow.com/questions/26008555/foreign-key-mongoose), [передаче параметров при загрузке модуля в Node.js](http://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module); был приятно удивлен шаблонизатором [Swig](http://paularmstrong.github.io/swig/)
