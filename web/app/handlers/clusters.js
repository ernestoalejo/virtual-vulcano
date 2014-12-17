// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var Cluster = require('../models/cluster'),
    Q = require('q');


module.exports = {

	list: function (req) {
		return Q.nfcall(Cluster.find, {});
	},

	show: function (req) {
		return Q.nfcall(Cluster.findById, req.id);
	},

	destroy: function (req) {
		return Q.nfcall(Cluster.remove, {clusterId: req.id});	
	},

	create: function (req) {
		var model = {
			clusterId: req.id,
			name: req.name,
			ip: req.ip,
			createdAt: req.createdAt,
			updatedAt: req.updatedAt
		};
		return Q.nfcall(Cluster.save, model);
	},

	update: function (req) {
		return Q.nfcall(Cluster.findById, req.id)
			.then(function (model) {
				model = {
					clusterId: req.id,
					name: req.name,
					ip: req.ip,
					createdAt: req.createdAt,
					updatedAt: req.updatedAt
				};
				return model;
			})
			.then(function (model) {
				return Q.nfcall(Cluster.save, model);
			});
	},
};
