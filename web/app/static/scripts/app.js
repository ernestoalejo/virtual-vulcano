// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var app = angular.module('app', [
  'ng',
  'ngMessages',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
]);


app.config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.rule(function (_1, $location) {
    var path = $location.path();

    // All URL should be lowercase
    var normalized = path.toLowerCase();

    // Remove the last slash
    if (normalized.charAt(normalized.length - 1) === '/') {
      normalized = normalized.substring(0, normalized.length - 1);
    }

    // Redirect if there's a change in the normalized URL
    if (path !== normalized) {
      $location.replace().path(normalized);
    }
  });

  // Activate home state when navigation to the empty one.
  // This is specially needed in IE9 because otherwise the root page is not resolved
  // when the user enters the page.
  $urlRouterProvider.when('', '/');

  // Activate HTML5 mode for client URLs
  $locationProvider.html5Mode(true);
});


app.run(function ($rootScope) {
  // Scroll to the top of the page when the current state changes
  $rootScope.$on('$stateChangeSuccess', function () {
    $('html,body').animate({scrollTop: 0, scrollLeft: 0});
  });
});
