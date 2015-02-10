// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var templates = require('../lib/templates.js'),
  plugins = require('../lib/plugins.js'),
  promised = require('../middlewares/promised'),
  _ = require('lodash');


var dashboard = function (req, res) {
  var pluginList = _.cloneDeep(plugins.list());
  pluginList.forEach(function (plugin) {
    if (!plugin.dashboard || !_.isFunction(plugin.dashboard.url)) {
      return;
    }

    plugin.dashboard.url = plugin.dashboard.url(req);
  });

  return templates.render(req, 'vv.dashboard', {
    plugins: _.filter(pluginList, 'dashboard'),
  });
};


plugins.register({
  routes: function (app) {
    app.get('/', promised(dashboard));
  },
});
