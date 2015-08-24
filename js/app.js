var bowerPath = '../bower_components/';

requirejs.config({
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	packages: ['alert', 'pagination', 'utils', 'zookeeper', {
		name: 'App',
		location: './',
		main: 'app'
	}],
	paths: {
		backbone: bowerPath + 'backbone/backbone',
		'backbone.wreqr': bowerPath + 'backbone.wreqr/lib/amd/backbone.wreqr.min',
		'backbone.babysitter': bowerPath + 'backbone.babysitter/lib/backbone.babysitter.min',
		foundation: bowerPath + 'foundation/js/foundation.min',
		handlebars: 'lib/handlebars',
		'handlebars.runtime': bowerPath + 'handlebars/handlebars.runtime.amd.min',
		io: '/socket.io/socket.io',
		jquery: bowerPath + 'jquery/dist/jquery.min',
		marionette: bowerPath + 'marionette/lib/core/amd/backbone.marionette.min',
		modernizr: bowerPath + 'modernizr/modernizr',
		underscore: bowerPath + 'underscore/underscore'
	},
	shim: {
		foundation: {
			deps: ['jquery']
		},
		io: {
			exports: 'io'
		},
		jquery: {
			exports: 'jquery'
		}
	}
});

// Start the main app logic.
require(['jquery', 'io', 'backbone', 'zookeeper/ZNodeView', 'alert', 'foundation'], function ($, io, Backbone, ZNodeView, AlertView) {
	$(document).foundation();

	var Marionette = Backbone.Marionette,
			App = new Marionette.Application();

	App.addRegions({
		content: Marionette.Region.extend({
			el: ".page-content"
		}),
		modal: Marionette.Region.extend({
			el: "#zModal"
		}),
		alertContainer: Marionette.Region.extend({
			el: "#alertContainer"
		})
	});

	App.addInitializer(function () {
		this.navigate = function () {
			console.log('navigate', arguments);
		};

		this.notFound = function (path) {
			!path && (path = '');

			socket.emit('getChildren', '/' + path);
		};

		this.router = new Marionette.AppRouter({
			controller: this,
			appRoutes: {
				'*notFound': 'notFound'
			}
		});
	});

	App.on('initialize:after', function () {
		// Start the router.
		Backbone.history.start({
			pushState: true
		});
	});

	var socket = io.connect('/'),
			currentNodeView,
			alertTimeout;

	socket.on('children', function (data) {
		var model = new Backbone.Model({
					path: data.path,
					app: App,
					allChildren: data.children
				});

		currentNodeView = new ZNodeView({
			model: model
		});

		App.content.show(currentNodeView);

		var collection = currentNodeView.collection;

		collection.on('destroy', function (model) {
			socket.emit('remove', model.get('link'));
			console.log(collection.models);
		});

		collection.on('add', function (model) {
			socket.emit('create', model.attributes);
			console.log(collection.models);
		});

		model.on('setData', function (node) {
			socket.emit('setData', node);
		});

		model.on('getData', function (p) {
			socket.emit('getData', p.link);
		});
	});

	socket.on('content', function (data) {
		currentNodeView.ui.data.val(data);
		currentNodeView.ui.dataContainer.show();
	});

	socket.on('feedback', function (feedback) {
		alertTimeout && clearTimeout(alertTimeout);

		App.alertContainer.show(new AlertView({
			className: 'alert-box radius ' + feedback.type,
			message: feedback.message
		}));

		if (feedback.type !== 'error') {
			alertTimeout = setTimeout(function () {
				App.alertContainer.close();
			}, 7000);
		}
	});

	App.start();

	return App;
});
