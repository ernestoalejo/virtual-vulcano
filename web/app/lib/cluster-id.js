'use strict';

var request = require('superagent'),
    Q = require('q');

module.exports = {
  fetch: function () {
    var req = request
      .get('http://discovery.etcd.io/new');

    return Q.ninvoke(req, 'end')
      .then(function (result) {
        var parts = result.text.split('/');
        return parts[parts.length - 1].trim();
      });
  },
};
