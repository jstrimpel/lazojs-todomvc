define(['snapSyncher', 'fs'], function (SnapSyncher, fs) {

    'use strict';

    var todosPath = SNAP.app._paths.FILE_REPO_PATH + '/models/tmp/todos.json',
        getTodos;

    getTodos = function (options) {
        return fs.existsSync(todosPath) ? JSON.parse(fs.readFileSync(todosPath, 'utf8')) : [];
    };

    return SnapSyncher.extend({

        fetch: function (options) {
            options.success(getTodos(options));
        }

    });
});
