define(['l!lazoView'], function (View) {

    'use strict';

    return View.extend({

        events: {
            'keypress #new-todo': 'create'
        },


        afterRender: function () {
            this.$input = this.$('#new-todo');
        },

        create: function (e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }

            this.ctl.ctx.collections.todos.create({
                title: this.$input.val(),
                completed: false
            });

            this.$input.val('');
        }

    });

});