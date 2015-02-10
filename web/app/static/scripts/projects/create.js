// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var module = angular.module('app');


module.controller('projects.CreateCtrl', function (Projects) {
  var ctrl = this;

  ctrl.data = {};

  ctrl.submit = function () {
    return Projects.create(ctrl.data).then(function () {
      location.href = '/projects';
    });
  };
});
