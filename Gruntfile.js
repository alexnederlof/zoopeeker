module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

	  handlebars: {
		  compile: {
		    options: {
			    amd: true,
			    namespace: 'templates'
		    },
		    files: {
			    'js/pagination/templates.js': ['js/pagination/*.hb'],
			    'js/alert/templates.js': ['js/alert/*.hb'],
			    'js/zookeeper/templates.js': ['js/zookeeper/*.hb']
		    }
		  }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
	    handlebars: {
	      files: 'js/**/*.hb',
		    tasks: ['handlebars']
	    },

      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('build', ['sass', 'handlebars']);
  grunt.registerTask('default', ['build', 'watch']);
};
