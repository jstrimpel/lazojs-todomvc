define(['s!snapCtl'], function (Ctl){

    'use strict';

    return Ctl.extend({

        index: function (options) {
            var self = this;

            self.loadCollection('todos', {
                success: function (collection) {
                    self.ctx.collections['todos'] = collection;
                    options.success('index');
                },
                error: function (err) {
                    options.error(err);
                }
            });
        }

    });

});
