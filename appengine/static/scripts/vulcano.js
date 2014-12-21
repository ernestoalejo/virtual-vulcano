'use strict';

// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

var app = angular.module('app', [
	'ng',
]);


app.controller('vulcano.GenerateCtrl', function ($http, $q) {
	var ctrl = this;

	ctrl.generate = function () {
		ctrl.loading = true;
		
		$q.all([
			$http.post('/api/code'),
		]).then(function (result) {
			ctrl.cloudConfig = result[0].data;
		});
	};
});
