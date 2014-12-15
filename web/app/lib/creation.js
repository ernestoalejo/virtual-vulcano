// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    Q = require('q'),
    childProccessPromise = require('child-process-promise');


module.exports = {

  create: function (clusterId) {
    return Q.nfcall(fs.stat, '/root/.ssh/id_rsa')
      .fail(function () {
        return childProccessPromise.exec('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');
      })
      .then(function () {
        return Q.all([
          Q.nfcall(fs.readFile, '/web/web/assets/cloud-config.tmpl.yml', 'utf-8'),
          Q.nfcall(fs.readFile, '/root/.ssh/id_rsa.pub', 'utf-8'),
        ]);
      })
      .then(function (result) {
        var template = result[0];
        var sshKey = result[1];

        return _.template(template, {
          clusterId: clusterId,
          sshKey: sshKey,
        });
      });
  },

};
