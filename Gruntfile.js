module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        uglify: {
            build: {
                src: ['src/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);
};