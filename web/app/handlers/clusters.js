// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var Cluster = require('../models/cluster'),
    Q = require('q');


module.exports = {

	list: function (req, res) {
		return Q.nfcall(Cluster.find, {});
	},

	show: function (req, res) {
		return Q.nfcall(Cluster.findById(req.id));
	},

	destroy: function (req, res) {
		return Q.nfcall(Cluster.remove({_id: req.id}));	
	},

	create: function (req, res) {
		Cluster.clusterId = req.id;
		Cluster.name = req.name;
		Cluster.createdAt = req.createdAt;
		Cluster.updatedAt = req.updatedAt;
	},

	update: function (req, res) {
	},

};
