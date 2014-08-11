module.exports = function (grunt) {

    grunt.registerTask('default', [ 'dev' ]);

    grunt.registerTask('dev', [
        'jshint',
        'clean:dist',
        'clean:bower',
        'build:dev',
        'http-server:dev',
        'watch:demo'
    ]);

    grunt.registerTask('dist', [
        'jshint',
        'clean:dist',
        'clean:bower',
        'build:dist'
    ]);

    grunt.registerTask('demo', [
        'dist',
        'http-server:demo'
    ]);

    grunt.registerMultiTask('build', simpleMultiTaskRunner);
    grunt.registerMultiTask('test', simpleMultiTaskRunner);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            demo: {
                dir: 'demo',
                files: 'demo/**'
            },
            dist: {
                js: {
                    dir: 'dist',
                    bundle: 'dist/<%= pkg.name %>.js'
                }
            },
            src: {
                js: {
                    dir: 'src/scripts',
                    files: 'src/scripts/**/*.js',
                    build: 'src/app.build.js',
                    main: 'src/scripts/main.js'
                }
            },
            spec: {
                main: 'test/main.js',
                bundle: 'test/<%= pkg.name %>.js',
                files: 'src/scripts/**/*.spec.js'
            },
            styles: {
                dir: 'src/styles',
                files: 'src/styles/**/*.css'
            }
        },
        clean: {
            dist: [ '<%= config.dist %>/*' ],
            bower: 'bower_components',
            styles: [
                '<%= config.dist %>/**/*.css',
                '!<%= config.dist %>/<%= pkg.name %>.css'
            ]
        },
        build: {
            dev: [
                'browserify:dev',
                'copy:all'
            ],
            dist: [
                'browserify:dist',
                'uglify:dist'
            ]
        },
        test: {
            dev: [
                'clean:test',
                'browserify:test-dev',
                'karma:unit',
                'watch:test',
                'clean:test'
            ],
            dist: [
                'clean:test',
                'browserify:test-dist',
                'karma:unit',
                'clean:test'
            ]
        },
        copy: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src.js.dir %>',
                    src: '**',
                    dest: '<%= config.dist %>/scripts'
                }]
            }
        },
        browserify: {
            dev: {
                files: [{
                    src: '<%= conf.src.js.main %>',
                    dest: '<%= conf.dist.js.bundle %>'
                }],
                options: {
                    bundleOptions: {
                        debug: true
                    }
                }
            },
            'test-dev': {
                files: [{
                    src: '<%= conf.src.js.main %>',
                    dest: '<%= conf.spec.bundle %>'
                }],
                options: {
                    bundleOptions: {
                        debug: true
                    }
                }
            },
            dist: {
                files: [{
                    src: '<%= conf.src.js.main %>',
                    dest: '<%= conf.dist.js.bundle %>'
                }],
                options: {
                    bundleOptions: {
                        debug: false,
                        transform: [ 'uglyfyify' ]
                    }
                }
            },
            'test-dist': {
                files: [{
                    src: '<%= conf.src.js.main %>',
                    dest: '<%= conf.spec.bundle %>'
                }],
                options: {
                    bundleOptions: {
                        debug: false,
                        transform: [ 'uglyfyify' ]
                    }
                }
            }
        },
        uglify: {
            dist: {
                files: [{
                    src: '<%= config.dist.js.bundle %>',
                    dest: '<%= config.dist.js.bundle %>'
                }]
            },
            'test-dist': {
                files: [{
                    src: '<%= config.spec.bundle %>',
                    dest: '<%= config.spec.bundle %>'
                }]
            }
        },
        watch: {
            demo: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.src.js.files %>',
                    '<%= config.demo.files %>'
                ],
                tasks: [ 'jshint', 'build:dev' ]
            },
            test: {
                files: [
                    '<%= config.src.js.files %>',
                    '<%= config.spec.files %>'
                ],
                tasks: [
                    'clean:test',
                    'browserify:test-dev',
                    'karma:unit'
                ]
            }
        },
        jshint: {
            files: [
                'gruntfile.js',
                '<%= config.spec.files %>',
                '<%= config.src.js.files %>'
            ]
        },
        'http-server': {
            dev: {
                root: '.',
                port: 8080,
                host: '127.0.0.1',
                cache: -1,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            },
            demo: {
                root: '.',
                port: 8080,
                host: '127.0.0.1',
                cache: -1,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: false
            }
        },
        karma: {
            unit: {
                options: {
                    configFile: '<%= config.spec.dir %>/karma.conf.js',
                    files: [
                        '<%= config.spec.dir %>/phantomjs-extensions.js',
                        '<%= config.spec.bundle %>'
                    ]
                }
            }
        },
    });

    require('load-grunt-tasks')(grunt);


    function simpleMultiTaskRunner() {
        grunt.task.run(this.data);
    }

};
