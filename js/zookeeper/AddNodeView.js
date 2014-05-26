define(['backbone', './templates'], function (Backbone, templates) {
	function submit() {
		var text = this.ui.path.val(),
				curLink = this.model.get('currentPath').link;

		this.model.set({
			link: curLink + (curLink.slice(-1) == '/' ? '' : '/') + text,
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