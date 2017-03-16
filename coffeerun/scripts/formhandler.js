var $ = window.jQuery;
var powerUpOn = false;

(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $('#strengthLevel').val();
            var flavor = $('#flavorshot').find(':selected').val();
            var size = $('input[name=size]:checked').val();
            var getError = $('#emailError');
            var getEmail = $('#emailInput');

            if (strength > 66 && flavor != '' && size === 'coffeezilla' && powerUpOn == false) {
                $('#myModal').modal('show');
                powerUpOn = true;
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    if (item.name == 'powerUp') {
                        data[item.name] = (data[item.name] || []).concat(item.value);
                    } else {
                        data[item.name] = item.value;
                    }
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

    $(document).on({
        change: function() {
            var self = this,
                output = $(self).next(),
                val = parseInt(self.value);
            if (val <= 33) {
                output.css({
                    color: 'green',
                });
            } else if (val > 33 && val <= 66) {
                output.css({
                    color: 'yellow',
                });
            } else {
                output.css({
                    color: 'red',
                });
            }
        }
    }, 'input[type="range"]');

})(window);

$('#claim-powerUps').on('click', function() {
    $('#myModal').modal('hide');
    $('#powerUp').show();
});

$('#use-Later').on('click', function() {
    $('#myModal').modal('hide');
});
