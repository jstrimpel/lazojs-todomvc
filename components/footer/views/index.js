define(['l!lazo/views/base'], function (View) {

    'use strict';

    return View.extend({

        events: {
            'click #clear-completed': 'destroy'
        },

        initialize: function () {
            var self = this;
            this.collection = this.ctl.ctx.collections.todos;

            this.setCount();
            this.listenTo(this.collection, 'add', this.updateCountDisplay);
            this.listenTo(this.collection, 'remove', this.updateCountDisplay);
            this.listenTo(this.collection, 'change', this.updateCountDisplay);
        },

        setCount: function () {
            this.completed = this.collection.completed().length;
            this.remaining = this.collection.remaining().length;
        },

        destroy: function (e) {
            _.invoke(this.collection.completed(), 'destroy');
            this.updateCountDisplay();
        },

        updateCountDisplay: function () {
            this.setCount();
            this.$remaining.text(this.remaining);
            this.$completed.text('Clear completed (' + this.completed + ')');
        },

        afterRender: function () {
            this.$remaining = this.$('#todo-count strong');
            this.$completed = this.$('#clear-completed');
        }

    });

});