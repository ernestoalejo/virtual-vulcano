'use strict';


var app = angular.module('app', [
	'ng',
]);


app.controller('vulcano.GenerateCtrl', function ($http, $q) {
	var ctrl = this;

	ctrl.generate = function () {
		$q.all([
			$http.get('/static/assets/cloud-config.tmpl'),
			// $http.get('/api/code'),
		]).then(function (result) {
			var template = result[0];
			var code = result[1];

			// console.log(template.data);
		});
	};
});
