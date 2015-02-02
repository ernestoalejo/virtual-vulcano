// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var templates = require('../lib/templates.js'),
    plugins = require('../lib/plugins.js'),
    promised = require('../middlewares/promised'),
    _ = require('lodash');


var dashboard = function (req, res) {
  return templates.render(req, 'vv.dashboard', {
    plugins: _.filter(plugins.list(), 'dashboard'),
  });
};


plugins.register({
  routes: function (app) {
    app.get('/', promised(dashboard));
  },
});



