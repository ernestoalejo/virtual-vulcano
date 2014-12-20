'use strict';


app.factory('Cluster', function ($http) {
  return {
    list: function () {
      return $http.get('/api/v1/clusters');
    },
  }
});
