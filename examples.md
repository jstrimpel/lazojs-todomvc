### Example Directory Structure

```
example-lazo-app/
    |-- app/
        |-- client/ (optional; contains client only code)
        |-- views/ (optional; application wide views and templates)
        |-- application.js (required; main entry point for application)
    |-- components/
        |-- example-component/
            |-- client/ (optional; contains client only code)
            |-- views/ (contains Lazo views and templates)
            |-- controller.js (optional)
    |-- models/
        |-- example-model/
            |-- server/ (optional if model is defined)
            |-- model.js (optional if syncher is defined)
        |-- example-collection/
            |-- server/ (optional if collection is defined)
            |-- collection.js (optional if syncher is defined)
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