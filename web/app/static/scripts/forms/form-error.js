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
