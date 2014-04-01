define(['lazoApp'], function (LazoApp) {

    'use strict';

    return LazoApp.extend({

        css: ['/app/client/base.css'],

        initialize: function (callback) {
            return callback();
        }

    });

});