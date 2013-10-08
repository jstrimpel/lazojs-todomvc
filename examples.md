### Example Directory Structure

```
example-lazo-app/
    |-- app/ (any resources that are shared across the app. should be placed here)
        |-- client/ (OPTIONAL; contains client only code)
        |-- server/ (OPTIONAL; contains server only code)
        |-- views/ (OPTIONAL; application wide views and templates)
        |-- application.js (REQUIRED; main entry point for application)
    |-- components/
        |-- example-component/
            |-- client/ (OPTIONAL; contains client only code)
            |-- server/ (OPTIONAL; contains server only code)
            |-- views/ (REQUIRED; contains Lazo views and templates)
                |-- index.js (OPTIONAL; default view object)
                |-- index.hbs (REQUIRED; default template)
            |-- controller.js (OPTIONAL)
    |-- models/
        |-- example-model/
            |-- server/ (OPTIONAL if model is defined)
            |-- model.js (OPTIONAL if syncher is defined)
        |-- example-collection/
            |-- server/ (OPTIONAL if collection is defined)
            |-- collection.js (OPTIONAL if syncher is defined)
```

### Example Route Definitions
```javascript
LAZO.app.addRoutes({
    // executes the index method for the taffy component
    '':                 'taffy',
    // executes the zilly method for the klunk component
    'muttley/':         'klunk#zilly',
    // executes the index method for the rosemary component
    'penrod(/)':        { component: 'rosemary' },
    // executes the index method for the blinky component matching the path parameter id, e.g. http://server.com/inky/1
    'inky/:id(/)':      'blinky',
    // executes the index method for the mumbly component and applies the quacker layout
    'snagglepuss(/)':   { component: 'mumbly', layout: 'quacker' },
    // executes the index method for the magilla component without applying the default layout
    'snuffles(/)':        { component: 'magilla', layout: false }
});
```

### Extending a Public Lazo Object
```javascript
define(['lazoView'], function (LazoView) {
    var MyView = LazoView.extend({
        foo: 'i am an instance property on the view'
    }, {
        bar: 'i am a static property on the view'
    });

    return MyView;
});
```