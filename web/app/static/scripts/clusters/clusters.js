// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


app.config(function ($stateProvider) {
  $stateProvider.state('clusters/list', {
    templateUrl: '/static/scripts/clusters/list.html',
    url: '/clusters',
    controller: 'clusters.ListCtrl',
    controllerAs: 'ctrl',
  });
});


app.controller('clusters.ListCtrl', function () {
  var ctrl = this;
});
