// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var Cluster = require('../models/cluster'),
    Q = require('q'),
    _ = require('lodash'),
    creation = require('../lib/creation'),
    start = require('../lib/start'),
    clusterId = require('../lib/cluster-id');


var fields = ['_id', 'updatedAt', 'createdAt', 'name', 'ip'];


module.exports = {

	list: function (req) {
		return Q.ninvoke(Cluster, 'find', {})
			.then(function (clusters) {
				return _.map(clusters, function (cluster) {
					return _.pick(cluster, fields);
				});
			});
	},

	show: function (req, res) {
		return Q.ninvoke(Cluster, 'findById', req.params.id)
			.fail(function () {
				res.sendStatus(404);
			})
			.then(function (cluster) {
				return _.pick(cluster, fields);
			});
	},

	destroy: function (req, res) {
		return Q.ninvoke(Cluster, 'remove', {_id: req.params.id})
			.fail(function () {
				res.sendStatus(404);
			})
			.then(function () {
				return {success: true};
			});
	},

	create: function (req) {
		return clusterId.fetch()
			.then(function (id) {
				var cluster = new Cluster({
					clusterId: id,
					name: req.body.name,
					ip: req.body.ip,
				});

				return Q.ninvoke(cluster, 'save');
			})
			.then(function () {
				return {success: true};
			});
	},

	update: function (req, res) {
		return Q.ninvoke(Cluster, 'findById', req.params.id)
			.fail(function () {
				res.sendStatus(404);
			})
			.then(function (model) {
				model.name = req.body.name;
				model.ip = req.body.ip;
				model.updatedAt = Date.now();

				return Q.nfcall(Cluster.save, model);
			})
			.then(function () {
				return {success: true};
			});
	},

	run: function (req, res) {
		return Q.ninvoke(Cluster, 'findById', req.params.id)
			.fail(function () {
				res.sendStatus(404);
			})
			.then(function (cluster) {
				return start.start(req.body.service, cluster.ip);
			});
	},

	install: function (req) {
		return Q.ninvoke(Cluster, 'findById', req.params.id)
			.fail(function () {
				res.sendStatus(404);
			})
			.then(function (cluster) {
				return creation.create(cluster.clusterId);
			})
			.then(function (cloudConfig) {
				return {
					cloudConfig: cloudConfig,
				};
			});
	},

};
