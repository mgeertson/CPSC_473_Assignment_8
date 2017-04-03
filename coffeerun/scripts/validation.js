(function() {
    'use strict';
    var App = window.App || {};
    var validEmail = App.validEmail;

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isDecaf: function(coffeeOrder, caffeineStrength) {
            console.log('In custom validation');
            if (/decaf/.test(coffeeOrder) && caffeineStrength >= '20') {
                return false;
            } else {
                return true;
            }
        },

        isTaken: function(email, remoteDS) {
            App.validEmail = true;
            return remoteDS.get(email, function (serverResponse) {
                if (serverResponse === null) {
                    App.validEmail = true;
                }
                else {
                    if (serverResponse.emailAddress === email) {
                        App.validEmail = false;
                    }
                }
            });
        }
    };
    App.Validation = Validation;
    App.validEmail = validEmail;
    window.App = App;
})(window);
