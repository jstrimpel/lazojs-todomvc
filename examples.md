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
    '':                 'todos-single', // map route to a component string
    'multiple(/)':      { component: 'todos-multiple' }, // map route to component object
    'single/:id(/)':    { component: 'todos-single' }, // tokenized route
    'layout(/)':        { component: 'main', layout: 'todos-layout' }, // map route to layout and component
    'header(/)':        { component: 'header', layout: false } // do not use default layout
});
```

### Extending a Public Lazo Object
```javascript
define(['lazoView'], function (LazoView) {
    var MyView LazoView.extend({
        foo: 'i am an instance property on the view'
    }, {
        bar: 'i am a static property on the view'
    });

    return MyView;
});
```