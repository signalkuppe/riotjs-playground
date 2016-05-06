module.exports = function (grunt) {

    grunt.initConfig({
        riot: {
            options: {},
            dist: {
                expand: true,
                cwd: 'riot/tags',
                src: '*.tag',
                dest: 'js/tags',
                ext: '.js'
            }
        },
        uglify: {
            dist: {
                src: ['riot/mixins/mixins.js','js/tags/*.js'],
                dest: 'js/app.min.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: './'
                }
            }
        },
        watch: {
          files: ['index.html','riot/tags/*.tag'],
          tasks: ['riot','uglify']
        },
    });

    grunt.registerTask('default', ['connect','watch']);
    grunt.loadNpmTasks('grunt-riot');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
