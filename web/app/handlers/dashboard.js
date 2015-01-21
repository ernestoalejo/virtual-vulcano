// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var users = require('../model/db.js'),
    templates = require('../../lib/templates.js');


module.exports = {

  dashboard: function (req, res) {
    return templates.render('vv.dashboard');
  },

};

