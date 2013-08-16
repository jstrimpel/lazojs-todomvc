define(['snapCollection', 'models/todo/model'], function (Collection, Model) {

    'use strict';

    return Collection.extend({

        model: Model,

        modelName: 'todo',

        comparator: function (todo) {
            return todo.get('created');
        },

        completed: function () {
            return this.filter(function (todo) {
                return todo.get('completed');
            });
        },

        remaining: function () {
            return this.without.apply(this, this.completed());
        }

    });

});