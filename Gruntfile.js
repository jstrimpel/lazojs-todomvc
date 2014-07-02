/*
 * This is ONLY required if you want to create
 * bundles for combo handling. Eventually there
 * will be a bundling utility.
 */

module.exports = function (grunt) {

    'use strict';

    var CleanCss = require('clean-css');
    var _ = require('lodash');
    var path = require('path');
    // the path to lazo on your systems
    var LAZO = '/Users/jstrimp/github.com/lazojs';
    // path to vendor files; required for stubbing rjs plugins
    var LAZO_VENDOR = LAZO + '/lib/vendor';
    // this is the lazo custom loader for the client
    var CLIENT_LOADER = LAZO + '/lib/client/loader.js';
    // these are paths for lazo lib files that should
    // be excluded from requirejs build
    var lazoPaths = grunt.file.readJSON(LAZO + '/lib/common/resolver/paths.json');

    // copy the lazo client loader
    grunt.file.copy(CLIENT_LOADER, 'loader.js');
    grunt.file.copy(LAZO_VENDOR + '/text.js', 'text.js');
    grunt.file.copy(LAZO_VENDOR + '/json.js', 'json.js');

    // set lazo paths to empty: so they are not included
    // in the build
    function getPaths() {
        var paths = _.extend({}, lazoPaths.common, lazoPaths.client);

        for (var key in paths) {
            if (key === 'text' || key === 'json') {
                paths[key] = key;
            } else {
                paths[key] = 'empty:';
            }
        }

        return paths;
    }

    // get the paths to include
    function getIncludes() {
        var files = grunt.file.expand([
            'app/app.json',
            'app/**/*.js',
            'app/**/*.hbs',
            'components/**/*.js',
            'components/**/*.hbs',
            'models/**/*.js',
            '!**/server/**/*.*',
        ]);

        return _.map(files, function (file) {
            file = file.replace(path.resolve(process.cwd()) + '/', '');

            if (file.lastIndexOf('.hbs') !== -1) {
                file = 'text!' + file;
            } else if (file.lastIndexOf('.json') !== -1) {
                file = 'json!' + file;
            }else {
                file = file.substr(0, file.lastIndexOf('.js'));
            }

            return file;
        });
    }

    function resolveImgPaths(css, filePath) {
        var urlRegex = /(?:\@import)?\s*url\(\s*(['"]?)(\S+)\1\s*\)/g;

        // set image urls to absolute paths
        return css.replace(urlRegex, function (match, quote, img, offset, str) {
            var absoluteUrl;

            if (img.substr(0, 1) === '/') { // already using absolute path
                return str;
            }

            absoluteUrl = path.resolve(path.dirname(filePath), img).replace(path.resolve(process.cwd()), '');
            return match.replace(img, absoluteUrl);
        });
    }

    function readCssFiles() {
        var css = '';
        var files = grunt.file.expand([
            'app/**/*.css',
            'components/**/*.css'
        ]);

        files.forEach(function (file) {
            css += ' ' + resolveImgPaths(grunt.file.read(file), file);
        });

        return css;
    }

    function writeCss(css) {
        // css = new CleanCss().minify(css);
        grunt.file.write('app/bundles/app.css', css);
    }

    grunt.initConfig({

        requirejs: {
            compile: {
                options: {
                    stubModules: ['text', 'json', 'l'],
                    include: getIncludes(),
                    paths: getPaths(),
                    map: {
                        '*': {
                            'l': 'loader.js'
                        }
                    },
                    outFileName: 'app',
                    baseUrl:  path.resolve('.'),
                    // optimize: 'uglify2',
                    optimize: 'none',
                    logLevel: 4,
                    out: 'app/bundles/app.js'
                }
            }
        }

    });

    grunt.registerTask('build-css', 'Combo handle CSS', function () {
        writeCss(readCssFiles());
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs', 'build-css']);

};