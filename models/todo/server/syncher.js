define(['lazoSyncher', 'fs'], function (LazoSyncher, fs) {

    'use strict';

    var todosPath = LAZO.app._paths.FILE_REPO_PATH + '/models/tmp/todos.json';

    // Generate four random hex digits.
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    function getTodos() {
        return fs.existsSync(todosPath) ? JSON.parse(fs.readFileSync(todosPath, 'utf8')) : [];
    }

    function findTodo(todos, attributes) {
        return _.find(todos, function (todo) {
            return todo.id === attributes.id;
        });
    }

    function getTodoIndex(todos, attributes) {
        var index = -1;

        for (var i = 0; i<todos.length; i++) {
            if (todos[i].id === attributes.id) {
                index = i;
                break;
            }
        }

        return index;
    }

    function update(todo, attributes) {
        if (!todo) {
            return;
        }

        for (var k in attributes) {
            todo[k] = attributes[k];
        }

        return todo;
    }

    function save(todos) {
        fs.writeFileSync(todosPath, JSON.stringify(todos), 'utf8')
    }

    function destroy(todos, index) {
        todos.splice(index, 1);
        return todos;
    }

    return LazoSyncher.extend({

        fetch: function (options) {
            options.success(findTodo(getTodos(), options));
        },

        add: function (attributes, options) {
            var todos = getTodos();

            attributes.id = guid();
            todos.push(attributes);
            save(todos);
            options.success(attributes);
        },

        update: function (attributes, options) {
            var todos = getTodos();

            update(findTodo(todos, attributes), attributes);
            save(todos);
            options.success(attributes);
        },

        destroy: function (attributes, options) {
            var todos = getTodos(),
                index;

            if ((index = getTodoIndex(todos, attributes)) === -1) {
                return options.error(new Error('model not found'));
            }

            save(destroy(todos, index));
            options.success(attributes);
        }

    });
});