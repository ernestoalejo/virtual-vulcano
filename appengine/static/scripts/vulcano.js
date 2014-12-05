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
			$http.get('/static/assets/cloud-config.tmpl'),
			$http.post('/api/code'),
		]).then(function (result) {
			var template = result[0];
			var code = result[1];

			ctrl.cloudConfig = template.data.replace('${TOKEN}', code.data.id);
		});
	};
});
