// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var plugins = require('../lib/plugins');


plugins.register({
  dashboard: {
    name: 'phpMyAdmin',
    url: function (req) {
        return '//' + req.url + ':9000/';
    },
    icon: 'fa-database',
  },
  
  routes: function (app) {

  },
});
