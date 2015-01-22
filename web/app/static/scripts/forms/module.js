// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

/**
 * Forms helper directives
 * @type {!angular.Module}
 */
var formsModule = angular.module('forms', [
  'ng',
  'ngMessages',
  'ngSanitize'
]);

formsModule.directive('ajaxForm', ajaxFormDirective);
formsModule.directive('formError', formErrorDirective);
formsModule.directive('formErrors', formErrorsDirective);
formsModule.directive('formGroup', formGroupDirective);
formsModule.directive('formSubmit', formSubmitDirective);
