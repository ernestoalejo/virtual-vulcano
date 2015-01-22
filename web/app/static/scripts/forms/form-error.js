// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


/**
 * Creates a new form error message.
 * @return {!angular.Directive} Directive definition object.
 */
var formErrorDirective = function() {
  return {
    restrict: 'E',
    require: '^formErrors',
    controller: function() { },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/static/scripts/forms/form-error.html',
    transclude: true,
    scope: /** @dict */ {
      'when': '@'
    }
  };
};
