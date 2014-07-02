define(['lazoBundle'], function (LazoBundle) {

    'use strict';

    // commnet out return to see combo handling
    // of static build. Bundle must be built using
    // Gruntfile.js, if any changes are made to
    // the bundled files' source.
    // return LazoBundle;

    // uncomment to enable combo handling
    return LazoBundle.extend({

        response: function (route, uri, callback) {
            callback({
                js: ['app/bundles/app.js'],
                css: ['app/bundles/app.css']
            });
        }

    });

});