// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


/**
 * Grouped field (an input, a textarea, ...) with its own errors.
 * @return {!angular.Directive} Directive definition object.
 */
var formGroupDirective = function() {
  return {
    restrict: 'E',
    require: ['formGroup', '^ajaxForm'],
    controller: FormGroupCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/static/scripts/forms/form-group.html',
    link: function (scope, element, attrs, ctrls) {
      var formGroupCtrl = /** @type {FormGroupCtrl} */ (ctrls[0]);
      formGroupCtrl.setAjaxFormCtrl(ctrls[1]);
    },
    transclude: true,
    scope: /** @dict */ {
      'name': '@'
    }
  };
};



/**
 * Grouped field (an input, a textarea, ...) with its own errors.
 * @constructor
 * @ngInject
 * @export
 */
var FormGroupCtrl = function() {
  /**
   * The name of the field.
   * @type {string}
   * @export
   */
  this.name;

  /**
   * The form controller instance; to see if an error ocurred in this field.
   * @type {!angular.FormController}
   * @export
   */
  this.form;

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
FormGroupCtrl.prototype.isSent = function() {
  return this.ajaxFormCtrl_.isSent();
};


/**
 * Sets the ajax form parent controller.
 * @param {AjaxFormCtrl} ajaxFormCtrl The form instance.
 */
FormGroupCtrl.prototype.setAjaxFormCtrl = function(ajaxFormCtrl) {
  this.ajaxFormCtrl_ = ajaxFormCtrl;
  this.form = ajaxFormCtrl.form;
};
