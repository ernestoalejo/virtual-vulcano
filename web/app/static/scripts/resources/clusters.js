'use strict';


app.factory('Cluster', function ($http) {
  return {
    list: function () {
      return $http.get('/api/v1/clusters');
    },

    create: function (data) {
      return $http.post('/api/v1/clusters', data);
    },

    run: function (id, data) {
      return $http.post('/api/v1/clusters/' + id + '/run', data);
    },

    install: function (id) {
      return $http.get('/api/v1/clusters/' + id + '/install');
    },
  };
});
