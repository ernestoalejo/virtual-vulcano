'use strict';


var module = angular.module('app');


module.controller('accounts.LoginCtrl', function (Accounts) {
  var ctrl = this;

  ctrl.data = {};

  ctrl.submit = function () {
    ctrl.error = false;
    
    return Accounts.login(ctrl.data).then(function (data) {
      if (data.sucess) {
        location.reload();
        return;
      }

      ctrl.error = true;
    });
  };
});
