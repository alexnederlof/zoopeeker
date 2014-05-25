define(['backbone', 'marionette', './templates', 'utils'], function (Backbone, Marionette, templates, utils) {
	function navigate(e) {
		var page = e.target.getAttribute('href');

		if (page != this.model.get('currentPage')) {
			var params = utils.getQueryVariables();

			params.p = page;

			Backbone.history.navigate(this.model.get('baseURL') + utils.mergeQueryVariables(params));

			this.trigger('page', page);
			this.changeCurrentPage(page);
		}

		return false;
	}

	return Marionette.ItemView.extend({
		className: 'row',
		template: templates['js/pagination/main.hb'],
		initialize: function (options) {
			!options && (options = {});

			this.model = new Backbone.Model(options);

			var count = this.model.get('count') || 1,
					itemsPerPage = this.model.get('itemsPerPage') || 10,
					currentPage = this.model.get('currentPage') || 1,
					pageCount = Math.ceil(count / itemsPerPage);

			this.model.set('pageCount', pageCount);

			this.changeCurrentPage(currentPage);
		},
		events: {
			'click .link': navigate
		},
		changeCurrentPage: function (page) {
			page = parseInt(page);

			var maxPagesToDisplayAtAnyTime = this.model.get('maxPages') || 5,
					pageCount = this.model.get('pageCount'),
					nextEnabled = page < pageCount,
					prevEnabled = page > 1,
					pages = [],
					from = page - maxPagesToDisplayAtAnyTime,
					to;

			maxPagesToDisplayAtAnyTime > pageCount && (maxPagesToDisplayAtAnyTime = pageCount);
			from < 1 && (from = 1);
			to = from + maxPagesToDisplayAtAnyTime * 2 - 1;
			to > pageCount && (to = pageCount);

			for (var i = from; i <= to; ++i) {
				pages.push({
					text: i
				});
			}

			pages[page - from].liClass = 'current';

			this.model.set('currentPage', page)
			this.model.set('pages', pages);
			this.model.set('prevPage', prevEnabled ? page - 1 : 1);
			this.model.set('nextPage', nextEnabled ? page + 1 : pageCount);
			this.model.set('prev', prevEnabled);
			this.model.set('next', nextEnabled);

			this.render();
		}
	});
});