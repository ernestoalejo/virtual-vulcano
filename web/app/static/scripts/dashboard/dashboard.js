// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


app.config(function ($stateProvider) {
  $stateProvider.state('dashboard', {
    templateUrl: '/static/partials/dashboard/dashboard.html',
    url: '/',
    controller: 'dashboard.Ctrl',
    controllerAs: 'ctrl',
  });
});


app.controller('dashboard.Ctrl', function () {
  // empty
});
