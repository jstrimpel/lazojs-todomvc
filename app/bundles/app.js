define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('json',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define("json!app/app.json", function(){ return {
    "routes": {
        "":             { "component": "todos-single", "servers": ["primary", "another_server"] },
        "multiple(/)":  { "component": "todos-multiple" },
        "single(/)":    { "component": "todos-single" },
        "layout(/)":    { "component": "main", "layout": "todos-layout" },
        "header(/)":    { "component": "header" },
        "main(/)":      { "component": "main" },
        "footer(/)":    { "component": "footer" },
        "hello(/)":     { "component": "hello", "layout": "todos-layout" }
    },
    "css": ["/app/client/base.css"]
};});

define('app/application',['lazoApp'], function (LazoApp) {

    

    return LazoApp.extend({

        initialize: function (callback) {
            return callback();
        }

    });

});
define('app/bundle',['lazoBundle'], function (LazoBundle) {

    

    // commnet out return to see combo handling
    // of static build. Bundle must be built using
    // Gruntfile.js, if any changes are made to
    // the bundled files' source.
    // return LazoBundle;

    // uncomment to enable combo handling
    return LazoBundle.extend({

        response: function (route, uri, callback) {
            callback({
                js: ['app/bundles/app.js'],
                css: ['app/bundles/app.css']
            });
        }

    });

});
(function () {
	

	// Underscore's Template Module
	// Courtesy of underscorejs.org
	var _ = (function (_) {
		_.defaults = function (object) {
			if (!object) {
				return object;
			}
			for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
				var iterable = arguments[argsIndex];
				if (iterable) {
					for (var key in iterable) {
						if (object[key] == null) {
							object[key] = iterable[key];
						}
					}
				}
			}
			return object;
		}

		// By default, Underscore uses ERB-style template delimiters, change the
		// following template settings to use alternative delimiters.
		_.templateSettings = {
			evaluate    : /<%([\s\S]+?)%>/g,
			interpolate : /<%=([\s\S]+?)%>/g,
			escape      : /<%-([\s\S]+?)%>/g
		};

		// When customizing `templateSettings`, if you don't want to define an
		// interpolation, evaluation or escaping regex, we need one that is
		// guaranteed not to match.
		var noMatch = /(.)^/;

		// Certain characters need to be escaped so that they can be put into a
		// string literal.
		var escapes = {
			"'":      "'",
			'\\':     '\\',
			'\r':     'r',
			'\n':     'n',
			'\t':     't',
			'\u2028': 'u2028',
			'\u2029': 'u2029'
		};

		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

		// JavaScript micro-templating, similar to John Resig's implementation.
		// Underscore templating handles arbitrary delimiters, preserves whitespace,
		// and correctly escapes quotes within interpolated code.
		_.template = function(text, data, settings) {
			var render;
			settings = _.defaults({}, settings, _.templateSettings);

			// Combine delimiters into one regular expression via alternation.
			var matcher = new RegExp([
				(settings.escape || noMatch).source,
				(settings.interpolate || noMatch).source,
				(settings.evaluate || noMatch).source
			].join('|') + '|$', 'g');

			// Compile the template source, escaping string literals appropriately.
			var index = 0;
			var source = "__p+='";
			text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
				source += text.slice(index, offset)
					.replace(escaper, function(match) { return '\\' + escapes[match]; });

				if (escape) {
					source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
				}
				if (interpolate) {
					source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
				}
				if (evaluate) {
					source += "';\n" + evaluate + "\n__p+='";
				}
				index = offset + match.length;
				return match;
			});
			source += "';\n";

			// If a variable is not specified, place data values in local scope.
			if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

			source = "var __t,__p='',__j=Array.prototype.join," +
				"print=function(){__p+=__j.call(arguments,'');};\n" +
				source + "return __p;\n";

			try {
				render = new Function(settings.variable || 'obj', '_', source);
			} catch (e) {
				e.source = source;
				throw e;
			}

			if (data) return render(data, _);
			var template = function(data) {
				return render.call(this, data, _);
			};

			// Provide the compiled function source as a convenience for precompilation.
			template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

			return template;
		};

		return _;
	})({});

	if (location.hostname === 'todomvc.com') {
		window._gaq = [['_setAccount','UA-31081062-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s)}(document,'script'));
	}

	function redirect() {
		if (location.hostname === 'tastejs.github.io') {
			location.href = location.href.replace('tastejs.github.io/todomvc', 'todomvc.com');
		}
	}

	function findRoot() {
		var base;

		[/labs/, /\w*-examples/].forEach(function (href) {
			var match = location.href.match(href);

			if (!base && match) {
				base = location.href.indexOf(match);
			}
		});

		return location.href.substr(0, base);
	}

	function getFile(file, callback) {
		if (!location.host) {
			return console.info('Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.');
		}

		var xhr = new XMLHttpRequest();

		xhr.open('GET', findRoot() + file, true);
		xhr.send();

		xhr.onload = function () {
			if (xhr.status === 200 && callback) {
				callback(xhr.responseText);
			}
		};
	}

	function Learn(learnJSON, config) {
		if (!(this instanceof Learn)) {
			return new Learn(learnJSON, config);
		}

		var template, framework;

		if (typeof learnJSON !== 'object') {
			try {
				learnJSON = JSON.parse(learnJSON);
			} catch (e) {
				return;
			}
		}

		if (config) {
			template = config.template;
			framework = config.framework;
		}

		if (!template && learnJSON.templates) {
			template = learnJSON.templates.todomvc;
		}

		if (!framework && document.querySelector('[data-framework]')) {
			framework = document.querySelector('[data-framework]').getAttribute('data-framework');
		}


		if (template && learnJSON[framework]) {
			this.frameworkJSON = learnJSON[framework];
			this.template = template;

			this.append();
		}
	}

	Learn.prototype.append = function () {
		var aside = document.createElement('aside');
		aside.innerHTML = _.template(this.template, this.frameworkJSON);
		aside.className = 'learn';

		// Localize demo links
		var demoLinks = aside.querySelectorAll('.demo-link');
		Array.prototype.forEach.call(demoLinks, function (demoLink) {
			demoLink.setAttribute('href', findRoot() + demoLink.getAttribute('href'));
		});

		document.body.className = (document.body.className + ' learn-bar').trim();
		document.body.insertAdjacentHTML('afterBegin', aside.outerHTML);
	};

	redirect();
	getFile('learn.json', Learn);
})();

define("app/client/base", function(){});

define('loader.js',['module'], function (mod) {

    function isServerOnly(name, paths) {
        var names = name.indexOf('/') ? name.split('/') : [name];
        for (var i = 0; i < names.length; i++) {
            if (paths[names[i]] && paths[names[i]].indexOf('/server/') !== -1) {
                return true;
            }
        }

        return false;
    }

    return {
        load: function (name, req, onload, config) {
            //req has the same API as require().
            if (name !== null && name.indexOf('/server/') === -1 && !isServerOnly(name, config.paths)) {

                req([name], function (value) {
                    onload(value);
                });

            } else {
                //Returning null for client side dependencies on server
                onload(null);
            }
        }
    };

});


define('app/ctl',['l!lazoCtl'], function (Ctl){

    

    return Ctl.extend({

        index: function (options) {
            var self = this;

            self.loadCollection('todos', {
                success: function (collection) {
                    self.ctx.collections['todos'] = collection;
                    options.success('index');
                },
                error: function (err) {
                    options.error(err);
                }
            });
        }

    });

});

define('app/views/todo',['lazoView'], function (View) {

    

    return View.extend({

        tagName: 'li',

        events: {
            'click .toggle': 'toggle',
            'click .destroy': 'destroy'
        },

        attributes: function () {
            var attributes = {},
                completed = this.model.get('completed'),
                filter = this.ctl.ctx.params.filter;

            if (this.model.get('completed')) {
                 attributes['class'] = 'completed';
            }

            if (filter === 'completed' && !completed ||
                filter === 'active' && completed) {
                attributes['class'] = attributes['class'] ? attributes['class'] + ' hidden' : 'hidden';
            }

            return attributes;
        },

        afterRender: function () {
            this.$checkbox = this.$('.toggle');
            this.listenTo(this.model, 'change', function () {
                this.$checkbox.prop('checked', this.model.get('completed'));
                this.$el.toggleClass(this.attributes()['class']);
                LAZO.app.trigger('todo-change');
            });
        },

        toggle: function (e) {
            this.model.save({
                'completed': e.target.checked
            });
        },

        destroy: function (e) {
            this.model.destroy();
        }

    });

});

define('text!app/views/todo.hbs',[],function () { return '<div class="view">\n    <input class="toggle" type="checkbox" {{#if model.completed}}checked{{/if}}>\n    <label>{{model.title}}</label>\n    <button class="destroy"></button>\n</div>\n<input class="edit" value="{{model.title}}">';});

define('components/footer/controller',['app/ctl'], function (Ctl){

    

    return Ctl;

});


define('components/footer/views/index',['l!lazoView'], function (View) {

    

    return View.extend({

        events: {
            'click #clear-completed': 'destroy'
        },

        initialize: function () {
            var self = this;
            this.collection = this.ctl.ctx.collections.todos;

            this.setCount();
            this.listenTo(this.collection, 'add', this.updateCountDisplay);
            this.listenTo(this.collection, 'remove', this.updateCountDisplay);
            this.listenTo(this.collection, 'change', this.updateCountDisplay);
        },

        setCount: function () {
            this.completed = this.collection.completed().length;
            this.remaining = this.collection.remaining().length;
        },

        destroy: function (e) {
            _.invoke(this.collection.completed(), 'destroy');
            this.updateCountDisplay();
        },

        updateCountDisplay: function () {
            this.setCount();
            this.$remaining.text(this.remaining);
            this.$completed.text('Clear completed (' + this.completed + ')');
        },

        afterRender: function () {
            this.$remaining = this.$('#todo-count strong');
            this.$completed = this.$('#clear-completed');
        }

    });

});
define('components/header/controller',['app/ctl'], function (Ctl){

    

    return Ctl;

});

define('components/header/views/index',['l!lazoView'], function (View) {

    

    return View.extend({

        events: {
            'keypress #new-todo': 'create'
        },


        afterRender: function () {
            this.$input = this.$('#new-todo');
        },

        create: function (e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }

            this.ctl.ctx.collections.todos.create({
                title: this.$input.val(),
                completed: false
            });

            this.$input.val('');
        }

    });

});
define('components/main/controller',['app/ctl'], function (Ctl){

    

    return Ctl;

});


define('components/main/views/index',['l!lazoCollectionView'], function (View) {

    

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
define('components/todos-layout/controller',['l!lazoCtl'], function (Ctl){

    

    return Ctl.extend({

        count: 0, // # of child components currently loaded

        cmpCount: 2, // # of child components to be loaded

        index: function (options) {
            var self = this,
                params = this.ctx.params;
            this.options = options;

            this.addChild('h-cmp', 'header', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
            this.addChild('f-cmp', 'footer', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
        },

        // basic counter for executing the callback once all children have loaded;
        // developer is free to use eventing, promises, async, etc.
        childLoaded: function () {
            this.count++;
            if (this.count === this.cmpCount) {
                this.options.success('index'); // load the index view
            }
        }

    });

});

define('components/todos-multiple/controller',['l!lazoCtl'], function (Ctl){

    

    return Ctl.extend({

        count: 0, // # of child components currently loaded

        cmpCount: 3, // # of child components to be loaded

        index: function (options) {
            var self = this,
                params = this.ctx.params;
            this.options = options;

            this.addChild('h-cmp', 'header', { // TODO: change names, e.g., hd-cmp
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
            this.addChild('m-cmp', 'main', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
            this.addChild('f-cmp', 'footer', {
                success: function (cmp) {
                    self.childLoaded();
                },
                error: function (err) {
                    options.error(err);
                },
                params: params
            });
        },

        // basic counter for executing the callback once all children have loaded;
        // developer is free to use eventing, promises, async, etc.
        childLoaded: function () {
            this.count++;
            if (this.count === this.cmpCount) {
                this.options.success('index'); // load the index view
            }
        }

    });

});

define('components/todos-single/controller',['app/ctl'], function (Ctl){

    

    return Ctl;

});
define('components/todos-single/views/index',['l!lazoCollectionView'], function (View) {

    

    return View.extend({

        events: {
            'click #toggle-all': 'toggle',
            'keypress #new-todo': 'create',
            'click #clear-completed': 'destroy'
        },

        collection: 'todos',

        itemView: 'a:todo',

        initialize: function () {
            var self = this;

            this.setCount();
            this.listenTo(this.collection, 'add', this.updateCountDisplay);
            this.listenTo(this.collection, 'remove', this.updateCountDisplay);
            this.listenTo(this.collection, 'change', this.updateCountDisplay);
        },

        afterRender: function () {
            this.$remaining = this.$('#todo-count strong');
            this.$completed = this.$('#clear-completed');
            this.$input = this.$('#new-todo');
        },

        setCount: function () {
            this.completed = this.collection.completed().length;
            this.remaining = this.collection.remaining().length;
        },

        destroy: function (e) {
            _.invoke(this.collection.completed(), 'destroy');
            this.updateCountDisplay();
        },

        create: function (e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }

            this.ctl.ctx.collections.todos.create({
                title: this.$input.val()
            }, { slient: true });

            this.$input.val('');
        },

        updateCountDisplay: function () {
            this.setCount();
            this.$remaining.text(this.remaining);
            this.$completed.text('Clear completed (' + this.completed + ')');
        },

        toggle: function (e) {
            this.collection.each(function (todo) {
                todo.save({
                    'completed': e.target.checked
                });
            });
        }

    });

});

define('text!components/footer/views/index.hbs',[],function () { return '<span id="todo-count"><strong>{{remaining}}</strong> item left</span>\n<ul id="filters">\n    <li>\n        <a class="selected" href="?filter=all" lazo-navigate>All</a>\n    </li>\n    <li>\n        <a href="?filter=active" lazo-navigate>Active</a>\n    </li>\n    <li>\n        <a href="?filter=completed" lazo-navigate>Completed</a>\n    </li>\n</ul>\n<button id="clear-completed">Clear completed ({{completed}})</button>';});


define('text!components/header/views/index.hbs',[],function () { return '<h1>todos</h1>\n<input id="new-todo" placeholder="What needs to be done?" autofocus>';});


define('text!components/hello/views/index.hbs',[],function () { return '<p style="padding-left: 60px;">Hello World!</p>';});


define('text!components/main/views/index.hbs',[],function () { return '<input id="toggle-all" type="checkbox">\n<label for="toggle-all">Mark all as complete</label>\n<ul id="todo-list" lazo-collection-target="collection"></ul>';});


define('text!components/todos-layout/views/index.hbs',[],function () { return '<section id="todoapp">\n    <header lazo-cmp-container="h-cmp" id="header"></header>\n    <section lazo-cmp-container="lazo-layout-body" id="main"></section>\n    <footer lazo-cmp-container="f-cmp" id="footer"></footer>\n</section>\n<footer id="info">\n    <p>Double-click to edit a todo</p>\n    <p>Created by <a href="https://github.com/jstrimpel">Jason Strimpel</a> using <a href="#">Lazo</a></p>\n    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>\n</footer>';});


define('text!components/todos-multiple/views/index.hbs',[],function () { return '<section id="todoapp">\n    <header lazo-cmp-container="h-cmp" id="header"></header>\n    <section lazo-cmp-container="m-cmp" id="main"></section>\n    <footer lazo-cmp-container="f-cmp" id="footer"></footer>\n</section>\n<footer id="info">\n    <p>Double-click to edit a todo</p>\n    <p>Created by <a href="https://github.com/jstrimpel">Jason Strimpel</a> using <a href="#">Lazo</a></p>\n    <p>\n        View individual components:\n        <a href="/header" lazo-navigate>header</a> |\n        <a href="/main" lazo-navigate>main</a> |\n        <a href="/footer" lazo-navigate>footer</a>\n    </p>\n    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>\n</footer>';});


define('text!components/todos-single/views/index.hbs',[],function () { return '<section id="todoapp">\n    <header id="header">\n        <h1>todos</h1>\n        <input id="new-todo" placeholder="What needs to be done?" autofocus>\n    </header>\n    <section id="main">\n        <input id="toggle-all" type="checkbox">\n        <label for="toggle-all">Mark all as complete</label>\n        <ul id="todo-list" lazo-collection-target="collection"></ul>\n    </section>\n    <footer id="footer">\n        <span id="todo-count"><strong>{{remaining}}</strong> item left</span>\n        <ul id="filters">\n            <li>\n                <a class="selected" href="?filter=all" lazo-navigate>All</a>\n            </li>\n            <li>\n                <a href="?filter=active" lazo-navigate>Active</a>\n            </li>\n            <li>\n                <a href="?filter=completed" lazo-navigate>Completed</a>\n            </li>\n        </ul>\n        <button id="clear-completed">Clear completed ({{completed}})</button>\n    </footer>\n</section>\n<footer id="info">\n    <p>Double-click to edit a todo</p>\n    <p>Created by <a href="https://github.com/jstrimpel">Jason Strimpel</a> using <a href="#">Lazo</a></p>\n    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>\n</footer>';});

define('models/todo/model',['lazoModel'], function (Model) {

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

define('models/todos/collection',['lazoCollection', 'models/todo/model'], function (Collection, Model) {

    

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
