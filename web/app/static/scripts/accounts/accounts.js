// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var module = angular.module('app');


module.service('Accounts', function ($http) {
  return {
    login: function (data) {
      return $http.post('/api/accounts/login', data).then(function (data) {
        return data.data;
      });    
    },

    logout: function () {
      return $http.post('/api/accounts/logout').then(function (data) {
        return data.data;
      });
    },

    changePassword: function (data) {
      return $http.post('/api/accounts/change-password', data).then(function (data) {
        return data.data;
      });
    },

  };
});
