'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        view_dev_path: 'fe-dev/view/',
        view_dist_path: 'public/view/',
        style_dev_path: 'fe-dev/style/',
        style_dist_path: 'public/style/',
        script_dev_path: 'fe-dev/script/',
        script_dist_path: 'public/script/',
        //tools usage
        jade_dev_file: '<%= view_dev_path %>app.jade',
        jade_dist_file: '<%= view_dist_path %>app.html',
        jade: {
            dev:{
                files: {
                    '<%= jade_dist_file %>': '<%= jade_dev_file %>'
                },
                options: {
                    pretty: true
                }
            }
        },
        sass_dev_file: '<%= style_dev_path %>app.sass',
        sass_dist_file: '<%= style_dist_path %>app.css',
        sass: {
            dev: {
                files: {
                    '<%= sass_dist_file %>': '<%= sass_dev_file %>'
                },
                options: {
                    sourcemap: "file"
                }
            }
        },
        browserify_dev_file: '<%= script_dev_path %>app.jsx',
        browserify_dist_file: '<%= script_dist_path %>app.js',
        browserify: {
            dev:{
                files: {
                    '<%= browserify_dist_file %>': '<%= browserify_dev_file %>'
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            options:{
                transform: [
                    ['babelify',{presets: ["es2015", "react"]}]
                ],
                browserifyOptions: {
                    extensions: ['.jsx'],
                }
            }
        },
        clean: {
            all: {
                src: [
                    '<%= view_dist_path %>app.html',
                    '<%= style_dist_path %>',
                    '<%= script_dist_path %>'
                ]
            }
        }
    });

    grunt.registerTask('default',[
        'clean:all',
        'jade:dev',
        'sass:dev',
        'browserify:dev'
    ]);
};