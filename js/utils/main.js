define(function () {
	var utils = {
		getQueryVariables: getQueryVariables,
		mergeQueryVariables: mergeQueryVariables
	};

	function getQueryVariables() {
		var vars = location.search.substring(1).split("&"),
				obj = {};

		for (var i = 0; i < vars.length; ++i) {
			if (vars[i]) {
				var pair = vars[i].split("=");

				obj[pair[0]] = pair.length == 2 ? pair[1] : undefined;
			}
		}

		return obj;
	}

	function mergeQueryVariables(params) {
		var arr = [];

		for (var key in params) {
			params[key] && arr.push(key + '=' + params[key]);
		}

		return arr.length ? '?' + arr.join('&') : '';
	}

	return utils;
});
