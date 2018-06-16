module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        target: './',

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/css/main.css': 'sass/main.scss'
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'build/css/*.css'
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= target %>/css/',
                ext: '.min.css'
            }
        },

        clean: {
            fonts: {
                src: ['build/fonts', '<%= target %>/fonts']
            },
            options: {
                'force': true
            }
        },

        copy: {
            fonts: {
                cwd: 'fonts',
                src: '**/*.*',
                expand: true,
                dest: '<%= target %>/fonts/',
                filter: 'isFile'
            }
        },

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'index.html': ['templates/index.pug']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['css'],
                options: {
                    spawn: false,
                }
            },
            template: {
                files: ['templates/**/*.pug'],
                tasks: ['pug']
            }

        }
    });

    // load in plugins
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // register tasks
    grunt.registerTask('default', ['build', 'watch']);
    // grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);
    grunt.registerTask('css', ['sass', 'postcss', 'cssmin']);
    grunt.registerTask('build', ['css', 'pug']);

}