// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


/**
 * Creates a new group of form error messages.
 * @return {!angular.Directive} Directive definition object.
 */
var formErrorsDirective = function() {
  return {
    restrict: 'E',
    require: ['formErrors', '^formGroup', '^ajaxForm'],
    controller: FormErrorsCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/static/scripts/forms/form-errors.html',
    transclude: true,
    link: function(scope, element, attrs, ctrls) {
      var formErrorsCtrl =
          /** @type {FormGroupCtrl} */ (ctrls[0]);

      var formGroupCtrl =
          /** @type {FormGroupCtrl} */ (ctrls[1]);

      var formErrorsCtrl.ajaxFormCtrl_ = /** @type {AjaxFormCtrl} */ (ctrls[2]);

      /**
       * Name of the form group.
       * @type {string}
       * @export
       */
      formErrorsCtrl.name = formGroupCtrl_.name;

      /**
       * Form instance; to access the field errors.
       * @type {!angular.FormController}
       * @export
       */
      formErrorsCtrl.form = ajaxFormCtrl_.form;
    },
    scope: /** @dict */ {
      'when': '@'
    }
  };
};



/**
 * Group of form error messages.
 * @constructor
 * @ngInject
 * @export
 */
var FormErrorsCtrl = function() {
  /**
   * Ajax form parent controller.
   * @type {AjaxFormCtrl}
   * @private
   */
  this.ajaxFormCtrl_;
};


/**
 * @return {boolean} True if the form has been sent at least once.
 * @export
 */
FormErrorsCtrl.prototype.isSent = function() {
  return this.ajaxFormCtrl_.isSent();
};
