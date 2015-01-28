// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var module = angular.module('app');


module.controller('accounts.ChangeUserPasswordCtrl', function (Accounts) {
  var ctrl = this;
  
  ctrl.submit = function () {
    ctrl.sent = false;
    
    Accounts.changePassword().then(function () {
        ctrl.sent = true;
    });
  };
});
