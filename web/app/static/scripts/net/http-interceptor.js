'use strict';


app.config(function ($httpProvider) {
  $httpProvider.interceptors.unshift('net.HTTPInterceptor');
});


app.factory('net.HTTPInterceptor', function ($q, $rootScope) {
  return {
    request: function (config) {
      return config || $q.when(config);
    },

    requestError: function (rejection) {
      $rootScope.$broadcast('errors.net');
      return $q.reject(rejection);
    },

    response: function (response) {
      // Extract the content data directly if it's an API request
      if (response.config.url.match(/^\/api\/.*$/)) {
        response = response.data;
      }

      return response || $q.when(response);
    },

    responseError: function (rejection) {
      $rootScope.$broadcast('errors.net');
      return $q.reject(rejection);
    },
  };
});
