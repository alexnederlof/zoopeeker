var async = require('async'),
		AsyncCache = require('async-cache'),
		express = require('express'),
		app = module.exports = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		path = require('path'),
		zookeeper = require('node-zookeeper-client'),
		zk = zookeeper.createClient('localhost:2181'),
		zkChildrenCache = new AsyncCache({
			// options passed directly to the internal lru cache
			max: 1000,
			maxAge: 1000 * 60,
			// method to load a thing if it's not in the cache.
			// key must be unique in the context of this cache.
			load: function (key, cb) {
				// the key can be something like the path, or fd+path, or whatever.
				// something that will be unique.
				// this method will only be called if it's not already in cache, and will
				// cache the result in the lru.
				zk.getChildren(key, null, function (err, children, stat) {
					if (err) {
						cb(err);
					} else {
						cb(null, {
							children: children,
							stat: stat
						});
					}
				});
			}
		});

zk.addAuthInfo('digest', new Buffer('ZookeeperUsername:ZookeeperPassword'));

zk.once('connected', function () {
	console.log('Connected to ZooKeeper.');
});

zk.connect();

server.listen(8080, function () {
	console.log("Zoopeeker is listening on port 8080 in the %s mode.", app.settings.env);
});

io.sockets.on('connection', function (socket) {
	socket.on('getChildren', function (p) {
		var paths = [];

		p = p.replace(/#/gi, '');

		(function tryAgain() {
			if (zk.getState().code == 3) {
				// Connected.

				async.waterfall([
					function (cb) {
						zk.exists(p, null, cb);
					},
					function (stat, cb) {
						if (stat) {
							zkChildrenCache.get(p, cb);
						} else {
							cb('Such znode does not exist.');
						}
					},
					function (result, cb) {
						socket.emit('children', {
							path: paths,
							children: result.children.map(function (child) {
								return {
									link: p + (p.slice(-1) == '/' ? '' : '/') + child,
									name: child
								}
							})
						});

						if (result.children.length) {
							cb();
						} else {
							zk.getData(p, null, function (err, data, stat) {
								if (err) {
									socket.emit('feedback', {
										message: err,
										type: 'error'
									});
								} else {
									socket.emit('content', data ? data.toString() : '');
								}
							});
						}
					}
				], function (err) {
					if (err) {
						socket.emit('feedback', {
							message: err.toString(),
							type: 'error'
						});
					}
				});
			} else {
				setTimeout(tryAgain, 5000);
			}
		})();

		var tempPath = '';

		p.split('/').forEach(function (p) {
			if (p) {
				tempPath += '/' + p;

				paths.push({
					text: p,
					link: tempPath
				});
			}
		});

		paths.unshift({
			text: 'Root',
			link: '/'
		});
	});

	socket.on('remove', function (p) {
		async.waterfall([
			function (cb) {
				zk.exists(p, null, cb);
			},
			function (stat, cb) {
				if (stat) {
					zk.remove(p, cb);
				} else {
					cb();
				}
			}
		], function (err) {
			if (err) {
				socket.emit('feedback', {
					message: err,
					type: 'error'
				});
			} else {
				socket.emit('feedback', {
					message: 'Node is successfully removed.',
					type: 'info'
				});

				zkChildrenCache.reset();
			}
		});
	});

	socket.on('create', function (n) {
		async.waterfall([
			function (cb) {
				zk.exists(n.link, null, cb);
			},
			function (stat, cb) {
				if (stat) {
					cb('Node already exists.');
				} else {
					zk.create(n.link, new Buffer(n.data), cb);
				}
			}
		], function (err) {
			if (err) {
				socket.emit('feedback', {
					message: err,
					type: 'error'
				});
			} else {
				socket.emit('feedback', {
					message: 'Node is successfully created.',
					type: 'info'
				});

				zkChildrenCache.reset();
			}
		});
	});

	socket.on('setData', function (n) {
		async.waterfall([
			function (cb) {
				zk.exists(n.path, null, cb);
			},
			function (stat, cb) {
				if (stat) {
					zk.setData(n.path, new Buffer(n.data), cb);
				} else {
					cb('Node does not exist.');
				}
			}
		], function (err) {
			if (err) {
				socket.emit('feedback', {
					message: err,
					type: 'error'
				});
			} else {
				socket.emit('feedback', {
					message: 'Successfully updated the node data.',
					type: 'info'
				});
			}
		});
	});

	socket.on('getData', function (p) {
		async.waterfall([
			function (cb) {
				zk.exists(p, null, cb);
			},
			function (stat, cb) {
				if (stat) {
					zk.getData(p, null, cb);
				} else {
					cb('Node does not exist.');
				}
			}
		], function (err, data) {
			if (err) {
				socket.emit('feedback', {
					message: err,
					type: 'error'
				});
			} else {
				socket.emit('content', data.toString());
			}
		});
	});
});

app.configure(function () {
	app.use(express.logger());
	app.use(express.static(path.join(__dirname, '..')));
});

app.get('/*', function (req, res) {
	res.sendfile(path.join(__dirname, '..', 'index.html'));
});
