define(['jquery', 'backbone', 'marionette', './ZNodeListItemView', './AddNodeView', './templates', 'pagination', 'utils'], function ($, Backbone, Marionette, ZNodeListItemView, AddNodeView, templates, PaginationView, utils) {
	var MAX_ZNODES_TO_DISPLAY = 15;

	function navigate(e) {
		Backbone.history.navigate(e.target.getAttribute('href'), true);
		return false;
	}

	function addNode() {
		var self = this,
				App = this.model.get('app'),
				model = new Backbone.Model({
					currentPath: this.model.get('currentPath')
				}),
				addNodeView = new AddNodeView({
					model: model
				});

		App.modal.show(addNodeView);

		$(document).one('opened', '[data-reveal]', function () {
			addNodeView.ui.path.focus();
		});

		App.modal.$el.foundation('reveal', 'open');

		model.once('add', function () {
			self.collection.add(model);
			App.modal.$el.foundation('reveal', 'close');
			addNodeView.remove();
		});
	}

	function saveData() {
		var node = this.model.get('path').slice(-1)[0];

		this.model.trigger('setData', {
			path: node.link,
			data: this.ui.data.val()
		});
	}

	function getData() {
		this.model.trigger('getData', this.model.get('path').slice(-1)[0]);
	}

	function search(e) {
		if (!e || !e.keyCode || e.keyCode == 13) {
			var params = utils.getQueryVariables();

			params.s = this.ui.searchInput.val();
			params.p = 1;
			this.model.set('currentPage', params.p);

			filterItems.call(this, params.s);

			Backbone.history.navigate(this.model.get('currentPath').link + utils.mergeQueryVariables(params));
		}
	}

	function filterItems(keyword) {
		if (keyword) {
			keyword = new RegExp(keyword, 'i');

			this.model.set('visibleChildren', this.model.get('allChildren').filter(function (model) {
				return keyword.test(model.get('name'));
			}));
		} else {
			this.model.set('visibleChildren', this.model.get('allChildren'));
		}
	}

	function renderPagination() {
		var pagination = new PaginationView({
					baseURL: this.model.get('currentPath').link,
					count: this.model.get('visibleChildren').length,
					currentPage: this.model.get('currentPage'),
					itemsPerPage: MAX_ZNODES_TO_DISPLAY,
					type: 'znodes'
				}),
				self = this;

		pagination.on('page', function (page) {
			self.model.set('currentPage', page);
			onVisibleChildrenChange.call(self);
		});

		this.ui.paginationContainer.html(pagination.render().el);
	}

	function onVisibleChildrenChange() {
		var offset = (this.model.get('currentPage') - 1) * MAX_ZNODES_TO_DISPLAY,
				data = this.model.get('visibleChildren').slice(offset, offset + MAX_ZNODES_TO_DISPLAY);

		this.collection.reset(data);
		this.model.set('count', this.model.get('visibleChildren').length);
	}

	return Marionette.CompositeView.extend({
		className: 'large-12 columns node',
		template: templates['js/zookeeper/ZNodeView.hb'],
		itemViewContainer: '.children',
		itemView: ZNodeListItemView,
		initialize: function () {
			var params = utils.getQueryVariables(),
					allChildren = this.model.get('allChildren');

			this.collection = new Backbone.Collection();

			this.model.set('allChildren', new Backbone.Collection(allChildren));
			this.model.set('currentPath', this.model.get('path').slice(-1)[0]);
			this.model.set('showSearch', allChildren.length > MAX_ZNODES_TO_DISPLAY);
			this.model.set('currentPage', params.p ? parseInt(params.p): 1);
			// `count` property will be changed when `filterItems()` is called
			// below. We define it here in order for the event to be bound
			// for changes.
			this.model.set('count', 0);

			this.listenTo(this.model, 'change:visibleChildren', onVisibleChildrenChange.bind(this));

			params.s && this.model.set('keyword', params.s);

			filterItems.call(this, params.s);

			this.listenTo(this.model, 'change:count', renderPagination.bind(this));
		},
		events: {
			'click .b-a': navigate,
			'click .add': addNode,
			'click .getData': getData,
			'click .save': saveData,
			'click .searchButton': search,
			'search .searchInput': search
		},
		ui: {
			data: '.data',
			dataContainer: '.dataContainer',
			paginationContainer: '.paginationContainer',
			searchInput: '.searchInput'
		},
		onRender: function () {
			renderPagination.call(this);
		}
	});
});