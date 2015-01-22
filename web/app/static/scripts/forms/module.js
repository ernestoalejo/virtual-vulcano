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
