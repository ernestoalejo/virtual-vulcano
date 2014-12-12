// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    Q = require('q'),
    childProccessPromise = require('child-process-promise');


module.exports = {
    _checkIfSSHExists: function () {
        return Q.nfcall(fs.stat, '/root/.ssh/id_rsa')
            .fail(function () {
                return childProccessPromise.exec('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');
            });
    },

    create: function (clusterId) {
        var info = {};

        return this._checkIfSSHExists()
            .then(function () {
                return Q.nfcall(fs.readFile, '/root/.ssh/id_rsa.pub', 'utf8');
            })
            .then(function (sshContent) {
                info.sshContent = sshContent;
                return Q.nfcall(fs.readFile, '/web/web/assets/cloud-config.tmpl.yml', 'utf8');
            })
            .then(function (cloudConfigTemplate) {
                return _.template(cloudConfigTemplate, {
                    'ID': clusterId,
                    'sshRsa': info.sshContent,
                });
            });
    },
};
