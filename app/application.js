define(function () {

    'use strict';

    return {

        css: ['/app/client/base.css'],

        initialize: function (callback) {
            SNAP.app.addRoutes({
                '':             { component: 'todos-single' },
                'multiple(/)':  { component: 'todos-multiple' },
                'single(/)':    { component: 'todos-single' },
                'layout(/)':    { component: 'main', layout: 'todos-layout' },
                'header(/)':    { component: 'header' },
                'main(/)':      { component: 'main' },
                'footer(/)':    { component: 'footer' },
                'hello(/)':    { component: 'hello', layout: 'todos-layout' },
            });

            return callback();
        }

    };

});