define(['lazo/views/base'], function (View) {

    'use strict';

    return View.extend({

        tagName: 'li',

        events: {
            'click .toggle': 'toggle',
            'click .destroy': 'destroy'
        },

        attributes: function () {
            var attributes = {},
                completed = this.model.get('completed'),
                filter = this.ctl.ctx.params.filter;

            if (this.model.get('completed')) {
                 attributes['class'] = 'completed';
            }

            if (filter === 'completed' && !completed ||
                filter === 'active' && completed) {
                attributes['class'] = attributes['class'] ? attributes['class'] + ' hidden' : 'hidden';
            }

            return attributes;
        },

        afterRender: function () {
            this.$checkbox = this.$('.toggle');
            this.listenTo(this.model, 'change', function () {
                this.$checkbox.prop('checked', this.model.get('completed'));
                this.$el.toggleClass(this.attributes()['class']);
                LAZO.app.trigger('todo-change');
            });
        },

        toggle: function (e) {
            this.model.save({
                'completed': e.target.checked
            });
        },

        destroy: function (e) {
            this.model.destroy();
        }

    });

});