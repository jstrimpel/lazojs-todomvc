# Lazojs TodoMVC Example

Lazojs is a client-server JavaScript web framework. The name is derived from the Spanish word lazo which means to link.
The goal of Lazojs is to provide a "link" between application views, models, and logic between the client and server truly
allowing a developer to write once, run anywhere.

## !important If You Read Anything Read this Section

**DO NOT PUSH ANY CHANGES TO THIS REPO.**

Please note that these examples are written within the context of TodoMVC and certain aspects of the implementations
would not be the same outside of this context. For example, when filtering the todo list one would likely send back
up the filtered subset of data as opposed to the entire result set. The latter approach was taken so that these examples
would be easier to compare to other library and framework examples.

### Three different implementations are included:

* **components/todos-single:** This is TodoMVC in its most basic form. It is one component that renders the entire screen.
* **components/todos-multiple:** This example illustrates how to break up a page into reusable components. It consists
  of a parent component, components/todos-multiple, and three child components - components/header, components/main,
  components/footer.
* **components/todos-layout:** This example further expands upon the reusable components concept and intrdocues a new
  concept, layouts. A layout is a component that contains a component container with the reserved value "body". The
  layout component is associated to route as a property in addition to the component property (see app/application.js).
  The component associated with the route in question is rendered in the "body" component container. If an executed
  route handler references the last layout rendered then only the "body" component is rendered
  on the client. An application can aslo specify a default layout outside of the route definitions.
* **components/hello:** This is strictly used to visualize the concept of a layout.

The framework, Lazojs, was called Snap! internally until the recently. You will see Snap! references throughout the
code please replace these with Lazojs in your mind as you read - Snap! is to Lazojs as Lazojs is to Snap!

This will not run without starting Lazojs (yet to be released) and pointing it to the repo. The current intent of
this example is to illustrate how an application would be structured using Lazojs in a familiar context, TodoMVC.

## Questions

Great. We are glad this has peaked your interest.

There is alot going on behind the scenes that is not covered in this example.

Please direct any questions to Jason Strimpel, [jstrimpel@walmartlabs](mailto:jstrimpel@walmartlabs).

## Created By

* Chi Ahrens
* Crystal Barnes
* Rodrigo Fernandez
* Paul Knepper
* Naga Malepati
* Jason Strimpel
* Anthony Tang