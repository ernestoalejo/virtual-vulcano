'use strict';


app.directive('ajaxForm', function () {
  return {
    restrict: 'E',
    templateUrl: '/static/scripts/forms/ajax-form.html',
    scope: {
      submit: '&',
      name: '=?',
    },
    controller: 'forms.ajaxFormCtrl',
    controllerAs: 'ctrl',
    transclude: true,
  };
});


app.controller('forms.ajaxFormCtrl', function ($scope, $timeout) {
  var ctrl = this;

  ctrl.submit = function () {
    // Reset the form to pristine state and flag it as sent
    ctrl.form.sent = true;
    ctrl.form.$setPristine();

    // Don't keep with the sending process if the form it's not valid
    if (!ctrl.form.$valid) {
      return;
    }
    
    // Submit the form
    var promise = $scope.submit({
      sentName: ctrl.sentName,
    });

    // If the process doesn't return a promise, we're done
    if (!promise) {
      return;
    }

    // Flag the sending process while it's active so the submit button can be
    // disabled in the meanwhile
    ctrl.form.sending = true;
    promise['finally'](function () {
      ctrl.form.sending = false;
    });
  };

  // Form cannot be accessed directly (we're in a directive), use a timeout
  $timeout(function () {
    ctrl.form = $scope.form;
    $scope.name = $scope.form;
  });
});


app.directive('formGroup', function () {
  return {
    restrict: 'E',
    templateUrl: '/static/scripts/forms/form-group.html',
    scope: {
      name: '@',
    },
    controller: 'forms.formGroupCtrl',
    controllerAs: 'ctrl',
    transclude: true,
    require: '^ajaxForm',
  };
});


app.controller('forms.formGroupCtrl', function ($element, $scope, $timeout) {
  var ctrl = this;
  var ajaxFormCtrl = $element.parent().controller('ajaxForm');

  // Name can be accesed directly from our scope
  ctrl.name = $scope.name;

  // Form should be deferred until the ajaxForm directive loads it
  $timeout(function () {
    ctrl.form = ajaxFormCtrl.form;
  });
});


app.directive('formSubmit', function () {
  return {
    restrict: 'E',
    templateUrl: '/static/scripts/forms/form-submit.html',
    transclude: true,
    require: '^ajaxForm',
    controller: 'forms.formSubmitCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      disabled: '=',
      btnClass: '@',
      name: '@',
    },
  };
});


app.controller('forms.formSubmitCtrl', function ($element, $timeout) {
  var ctrl = this;
  var ajaxFormCtrl = $element.parent().controller('ajaxForm');

  // Form should be deferred until the ajaxForm directive loads it
  $timeout(function () {
    ctrl.form = ajaxFormCtrl.form;
  });

  ctrl.registerClick = function () {
    ajaxFormCtrl.sentName = ctrl.name;
  };
});


app.directive('formErrors', function () {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/static/scripts/forms/form-errors.html',
    transclude: true,
    controller: 'forms.formErrorsCtrl',
    controllerAs: 'ctrl',
    require: '^formGroup',
  };
});


app.controller('forms.formErrorsCtrl', function ($element, $timeout) {
  var ctrl = this;
  var formGroupCtrl = $element.parent().controller('formGroup');

  // Name can be accesed directly from our scope
  ctrl.name = formGroupCtrl.name;

  // Form should be deferred until the ajaxForm directive loads it
  $timeout(function () {
    ctrl.form = formGroupCtrl.form;
  });
});


app.directive('formError', function () {
  return {
    restrict: 'E',
    templateUrl: '/static/scripts/forms/form-error.html',
    controller: 'forms.formErrorCtrl',
    controllerAs: 'ctrl',
    transclude: true,
    scope: {
      when: '@',
    },
    require: '^formErrors',
  };
});


app.controller('forms.formErrorCtrl', function ($scope) {
  var ctrl = this;

  // Access when for the ngMessage directive
  ctrl.when = $scope.when;
});
