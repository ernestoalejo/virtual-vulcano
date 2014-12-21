'use strict';

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    Q = require('q');

module.exports = {
  startup: function () {
    return Q.nfcall(mkdirp, '/root/.ssh')
      .then(function () {
        return Q.nfcall(fs.readFile, 'app/assets/ssh-config.tmpl');
      })
      .then(function (sshConfig) {
        return Q.nfcall(fs.writeFile, '/root/.ssh/config', sshConfig);
      });
  },
};
