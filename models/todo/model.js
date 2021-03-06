define(['lazoModel'], function (Model) {

   return Model.extend({

        defaults: {
            title: '',
            completed: false,
            created: 0
        },

        initialize: function () {
            if (this.isNew()) {
                this.set('created', Date.now());
            }
        }

   });

});
