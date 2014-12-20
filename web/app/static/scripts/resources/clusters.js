'use strict';


app.factory('Cluster', function ($http) {
  return {
    list: function () {
      return $http.get('/api/v1/clusters');
    },

    create: function (data) {
      return $http.post('/api/v1/clusters', data);
    },
  };
});
