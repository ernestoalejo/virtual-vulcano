// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var plugins = [];


module.exports = {

  /**
   * Register a new plugin in the system.
   * @param {Object} info The info about the plugin. It should have these keys:
   *   - name <string> The name that will be showed in the dashboard.
   *   - url <string> The URL of the link in the dashboard.
   *   - icon <string> The name of the Font Awesome icon for the dashboard.
   *   - routes <function(app)> Function that will be called to register the
   *       routes this plugin will handle.
   */
  register: function (info) {
    plugins.push(info);
  },

  /**
   * List the registered plugins.
   * @return {Array} The list of plugins.
   */
  list: function () {
    return plugins;
  },

  /**
   * Empty list of plugins.
   * @private
   */
  _reset: function () {
    plugins = [];
  },

};
