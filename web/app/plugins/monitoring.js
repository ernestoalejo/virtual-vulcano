// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var plugins = require('../lib/plugins');


plugins.register({
  dashboard: {
    name: 'Monitoring',
    url:  '/acounts/monitoring',
    icon: 'fa-tachometer',
  },
  routes: function (app) {

  },
});
