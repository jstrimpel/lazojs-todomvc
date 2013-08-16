define(['s!snapCollectionView'], function (View) {

    'use strict';

    return View.extend({

        events: {
            'click #toggle-all': 'toggle'
        },

        collection: 'todos',

        itemView: 'a:todo',

        toggle: function (e) {
            this.collection.each(function (todo) {
                todo.save({
                    'completed': e.target.checked
                });
            });
        }

    });

});