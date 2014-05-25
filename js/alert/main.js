define(['backbone', 'marionette', './templates'], function (Backbone, Marionette, templates) {
	return Marionette.ItemView.extend({
		template: templates['js/alert/main.hb'],
		initialize: function (options) {
			this.model = new Backbone.Model(options);
		}
	});
});