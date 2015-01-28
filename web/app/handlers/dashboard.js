// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var users = require('../models/db.js'),
    templates = require('../lib/templates.js'),
    plugins = require('../lib/plugins.js');


module.exports = {

  dashboard: function (req, res) {
    if (!req.session.user) {
      return templates.render(req, 'vv.login');
    }
    
    return templates.render(req, 'vv.dashboard', {
      plugins: plugins.list(),
    });
  },

};

