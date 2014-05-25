define(['backbone', './templates'], function (Backbone, templates) {
	function submit() {
		var text = this.ui.path.val();

		this.model.set({
			link: this.model.get('currentPath').link + '/' + text,
			name: text,
			data: this.ui.data.val()
		});

		this.model.trigger('add');

		return false;
	}

	return Backbone.Marionette.ItemView.extend({
		template: templates['js/zookeeper/addNode.hb'],
		events: {
			'submit #addNodeForm': submit
		},
		ui: {
			path: '.path',
			data: '.data'
		}
	});
});