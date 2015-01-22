// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


/**
 * Submit button for the form.
 * @return {!angular.Directive} Directive definition object.
 */
var formSubmitDirective = function() {
  return {
    restrict: 'E',
    require: ['formSubmit', '^ajaxForm'],
    controller: FormSubmitCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/static/scripts/forms/form-submit.html',
    transclude: true,
    link: function (scope, element, attrs, ctrls) {
      var formSubmitCtrl = /** @type {FormGroupCtrl} */ (ctrls[0]);
      formSubmitCtrl.setAjaxFormCtrl(ctrls[1]);
    },
    scope: /** @dict */ {
      'disabled': '=',
      'btnClass': '@',
      'name': '@'
    }
  };
};



/**
 * Submit button for the form.
 * @constructor
 * @ngInject
 * @export
 */
var FormSubmitCtrl = function() {
  /**
   * Sending form button label.
   * @type {string}
   * @export
   */
  this.sendingMsg = 'Enviando...';

  /**
   * Button name, to register it when sending so we can differentiate several
   * submit buttons in the same form.
   * @type {string|undefined}
   * @export
   */
  this.name;

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
FormSubmitCtrl.prototype.isSent = function() {
  return this.ajaxFormCtrl_.isSent();
};


/**
 * @return {boolean} True if we're sending the form to the server right now.
 * @export
 */
FormSubmitCtrl.prototype.isSending = function() {
  return this.ajaxFormCtrl_.isSending();
};


/**
 * Register the button name in the form.
 */
FormSubmitCtrl.prototype.registerClick = function() {
  if (this.name) {
    this.ajaxFormCtrl_.setSentName(this.name);
  }
};


/**
 * Sets the ajax form parent controller.
 * @param {AjaxFormCtrl} ajaxFormCtrl The form instance.
 */
FormSubmitCtrl.prototype.setAjaxFormCtrl = function(ajaxFormCtrl) {
  this.ajaxFormCtrl_ = ajaxFormCtrl;
};
