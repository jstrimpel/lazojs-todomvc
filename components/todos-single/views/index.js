define(['s!snapCollectionView'], function (View) {

    'use strict';

    return View.extend({

        events: {
            'click #toggle-all': 'toggle',
            'keypress #new-todo': 'create',
            'click #clear-completed': 'destroy'
        },

        collection: 'todos',

        itemView: 'a:todo',

        initialize: function () {
            var self = this;

            this.setCount();
            this.listenTo(this.collection, 'add', this.updateCountDisplay);
            this.listenTo(this.collection, 'remove', this.updateCountDisplay);
            this.listenTo(this.collection, 'change', this.updateCountDisplay);
        },

        afterRender: function () {
            this.$remaining = this.$('#todo-count strong');
            this.$completed = this.$('#clear-completed');
            this.$input = this.$('#new-todo');
        },

        setCount: function () {
            this.completed = this.collection.completed().length;
            this.remaining = this.collection.remaining().length;
        },

        destroy: function (e) {
            _.invoke(this.collection.completed(), 'destroy');
            this.updateCountDisplay();
        },

        create: function (e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }

            this.ctl.ctx.collections.todos.create({
                title: this.$input.val()
            }, { slient: true });

            this.$input.val('');
        },

        updateCountDisplay: function () {
            this.setCount();
            this.$remaining.text(this.remaining);
            this.$completed.text('Clear completed (' + this.completed + ')');
        },

        toggle: function (e) {
            this.collection.each(function (todo) {
                todo.save({
                    'completed': e.target.checked
                });
            });
        }

    });

});