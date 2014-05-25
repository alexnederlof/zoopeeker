module.exports = process.env.CODE_COV
		? require('./lib-cov/app')
		: require('./lib/app');
