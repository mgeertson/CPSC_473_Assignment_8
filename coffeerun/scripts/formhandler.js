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
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
            .then(function () {
              this.reset();
              this.elements[0].focus();
            }.bind(this));

        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addCustomHandler = function(fn) {
        $('#strengthLevel').change(function(event) {
            var coffeeOrder = $('#coffeeOrder').val();
            var caffeineStrength = event.target.value;
            if (fn(coffeeOrder, caffeineStrength)) {
                event.target.setCustomValidity('');
            } else {
                var message = 'Decaf Coffee with caffeine strength over 20? Sorry, ain\'t decaf!';
                event.target.setCustomValidity(message);
            }
        });

    };

    FormHandler.prototype.addOrderInputHandler = function (fn, remoteDS) {
        this.$formElement.on('blur', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            fn(emailAddress, remoteDS)
            .then(function () {
                if (App.validEmail) {
                    event.target.setCustomValidity('');
                } else {
                    var taken = emailAddress + ' already has a pending order.';
                    event.target.setCustomValidity(taken);
                }
            });
        });
    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
