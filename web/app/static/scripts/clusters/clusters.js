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

  $stateProvider.state('clusters/create', {
    templateUrl: '/static/scripts/clusters/create.html',
    url: '/clusters/create',
    controller: 'clusters.CreateCtrl',
    controllerAs: 'ctrl',
  });
});

app.controller('clusters.ListCtrl', function (Cluster) {
  var ctrl = this;

  Cluster.list().then(function (clusters) {
    ctrl.clusters = clusters;
  });
});

app.controller('clusters.CreateCtrl', function (Cluster, $state) {
  var ctrl = this;

  ctrl.data = {};

  ctrl.submit = function () {
    return Cluster.create(ctrl.data).then(function () {
      $state.go('clusters/list');
    });
  };
});
