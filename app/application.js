define(['base'], function (Base) {

    'use strict';

    return Base.extend({

        css: ['/app/client/base.css'],

        initialize: function (callback) {
            LAZO.app.addRoutes({
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

    });

});