define(['backbone', 'marionette', './templates'], function (Backbone, Marionette, templates) {
	function navigate() {
		Backbone.history.navigate(this.model.get('link'), true);
		return false;
	}

	function removeNode() {
		this.model.destroy();
	}

	return Marionette.ItemView.extend({
		className: 'child row',
		template: templates['js/zookeeper/ZNodeListItemView.hb'],
		events: {
			'click .link': navigate,
			'click .remove': removeNode
		}
	});
});