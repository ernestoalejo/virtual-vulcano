// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var module = angular.module('app');


module.service('Projects', function ($http) {
  return {
    create: function (data) {
      return $http.post('/api/projects/create', data).then(function (data) {
        return data.data;
      });    
    },
  };
});
