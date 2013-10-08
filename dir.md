# Example Directory Structure

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