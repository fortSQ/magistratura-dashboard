$(function () {
    var widgetPopup = '#add_widget';
    var $addWidgetForm = $('form[name=add_widget]', widgetPopup);
    $addWidgetForm.on('submit', function (event) {
        event.preventDefault();
        createOrUpdateWidget(this, 'PUT', function (data) {
            $('.card-columns').append(data);
        });
    });

    var editWidget = '#edit_widget';
    var $editWidgetForm = $('form', editWidget);
    $('[data-widget=edit]').on('click', function () {
        var widgetId = $(this).closest('[data-id]').data('id');
        $.get('/widget?id=' + widgetId, function (data) {
            $('span.widget_id', editWidget).html(widgetId);
            $('textarea', $editWidgetForm).val(data.message);
            $('select', $editWidgetForm).val(data.color);
            $('input[name=id]', $editWidgetForm).val(data.id);
            $('input[name=image]', $editWidgetForm).val(data.image);
            $(editWidget).modal();
        })
    });
    $editWidgetForm.on('submit', function (event) {
        event.preventDefault();
        createOrUpdateWidget(this, 'POST', function (data) {
            var $card = $('.card[data-id=' + data.id + ']');
            // вычищаем классы-бэкграунды и добавляем нужный
            $('.card-block', $card).removeClass('card-primary card-info card-success card-warning card-danger');
            $('.card-block', $card).addClass('card-' + data.color);
            // сам текст
            $('p', $card).html(data.message);
            // проставляем дату создания и модификации
            var cite = data.created;
            if (data.created != data.modified) {
                cite += ' (' + data.modified + ')';
            }
            $('cite', $card).html(cite);
            // и картиночку
            $('img', $card).attr('src', data.image);
        });
    });

    var createOrUpdateWidget = function (form, method, callback) {
        $form = $(form);
        $.ajax({
            url: "/widget",
            method: method,
            data: $form.serialize(),
            success: function (data) {
                callback.call(this, data);
                $form.closest('.modal').modal('hide');
                $('input, select, textarea', $form).val('');
            }
        });
    };

    $('[data-widget=delete]').on('click', function () {
        var widgetId = $(this).closest('[data-id]').data('id');
        $.ajax({
            url: "/widget",
            method: 'DELETE',
            data: {id: widgetId},
            success: function (data) {
                $('.card[data-id=' + data.id + ']').remove();
            }
        });
    });

    var settings = '#settings';
    var $settingsForm = $('form', settings);
    // получение настроек
    $('[data-target="#settings"]').on('click', function () {
        $.get('/settings', function (data) {
            $('input[name=name]', $settingsForm).val(data.name);
            $('input[name=surname]', $settingsForm).val(data.surname);
            $('input[name=city]', $settingsForm).val(data.city);
        })
    });
    // обновление настроек
    $settingsForm.on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: "/settings",
            method: 'POST',
            data: $settingsForm.serialize(),
            success: function (data) {
                var $userbar = $('#self .media-body');
                $('h4', $userbar).html(data.name + ' ' + data.surname);
                $('p', $userbar).html(data.city);
                $settingsForm.closest('.modal').modal('hide');
                $('input, select, textarea', $settingsForm).val('');
            }
        });
    });
});