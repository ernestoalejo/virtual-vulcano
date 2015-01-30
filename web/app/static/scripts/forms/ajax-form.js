// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


/**
 * A new kind of form powered by Angular controllers instead of normal
 * send methods.
 * @return {!angular.Directive} Directive definition object.
 */
var ajaxFormDirective = function() {
  return {
    restrict: 'E',
    controller: AjaxFormCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/static/scripts/forms/ajax-form.html',
    transclude: true,
    scope: /** @dict */ {
      'submitCallback': '&submit',
      'name': '=?'
    }
  };
};



/**
 * A new kind of form powered by Angular controllers instead of normal
 * send methods.
 * @constructor
 * @ngInject
 * @export
 */
var AjaxFormCtrl = function() {
  /**
   * Form instance filled from the UI.
   * @type {!angular.FormController}
   * @export
   */
  this.form;

  /**
   * The function to call when submitting the form.
   * @type {function(!Object):(!angular.$q.Promise|undefined)}
   * @export
   */
  this.submitCallback;

  /**
   * The name of the sent button that triggered the submit.
   * @type {string}
   * @private
   */
  this.sentName_ = '';

  /**
   * True if we're sending the form to the server.
   * @type {boolean}
   * @private
   */
  this.sending_ = false;

  /**
   * True if the form has been sent at least once (with validation
   * errors or not)
   * @type {boolean}
   * @private
   */
  this.sent_ = false;
};


/**
 * Submits the form.
 * @export
 */
AjaxFormCtrl.prototype.submit = function() {
  this.sent_ = true;
  this.form.$setPristine();

  if (!this.form.$valid) {
    return;
  }

  // The sentName parameter name should be kept for the template.
  var submitData = {};
  submitData['sentName'] = this.sentName_;
  var promise =
      /** @type {angular.$q.Promise} */ (this.submitCallback(submitData));

  // Reset sent name back to the default value
  this.sentName_ = '';

  if (!promise) {
    return;
  }

  this.sending_ = true;
  promise.finally(_.bind(this.submitEnd_, this));
};


/**
 * Called when the submit has finished.
 * @private
 */
AjaxFormCtrl.prototype.submitEnd_ = function() {
  this.sending_ = false;
};


/**
 * Changes the sent name of the form.
 * @param {string} sentName The new sent name.
 */
AjaxFormCtrl.prototype.setSentName = function(sentName) {
  this.sentName_ = sentName;
};


/**
 * @return {boolean} True if we're sending the form right now.
 */
AjaxFormCtrl.prototype.isSending = function() {
  return this.sending_;
};


/**
 * @return {boolean} True if the form has been sent at least once.
 */
AjaxFormCtrl.prototype.isSent = function() {
  return this.sent_;
};
