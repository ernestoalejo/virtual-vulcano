// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var module = angular.module('app');


module.controller('accounts.LoginCtrl', function (Accounts) {
  var ctrl = this;

  ctrl.data = {};

  ctrl.submit = function () {
    ctrl.error = false;
    
    return Accounts.login(ctrl.data).then(function (data) {
      if (data.success) {
        location.replace('/');
        return;
      }

      ctrl.error = true;
    });
  };
});
