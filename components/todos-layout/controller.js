define(['s!lazoCtl'], function (Ctl){

    'use strict';

    return Ctl.extend({

        count: 0, // # of child components currently loaded

        cmpCount: 2, // # of child components to be loaded

        index: function (options) {
            var self = this,
                params = this.ctx.params;
            this.options = options;

            this.addChild('h-cmp', 'header', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
            this.addChild('f-cmp', 'footer', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
        },

        // basic counter for executing the callback once all children have loaded;
        // developer is free to use eventing, promises, async, etc.
        childLoaded: function () {
            this.count++;
            if (this.count === this.cmpCount) {
                this.options.success('index'); // load the index view
            }
        }

    });

});
