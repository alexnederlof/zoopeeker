module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		handlebars: {
			compile: {
				options: {
					amd: true,
					namespace: 'Handlebars.templates'
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
		uglify: {
			templates: {
				files: {
					'js/pagination/templates.js': ['js/pagination/templates.js'],
					'js/alert/templates.js': ['js/alert/templates.js'],
					'js/zookeeper/templates.js': ['js/zookeeper/templates.js']
				}
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			handlebars: {
				files: 'js/**/*.hb',
				tasks: ['handlebars', 'uglify']
			},
			sass: {
				files: 'scss/**/*.scss',
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('build', ['handlebars', 'sass', 'uglify']);
	grunt.registerTask('default', ['build', 'watch']);
};
