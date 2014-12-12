// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    Q = require('q'),
    exec = require('child-process-promise').exec;

module.exports = {
    create: function (clusterId) {
        var info = {};
        return Q.nfcall(fs.lstat, '/root/.ssh/id_rsa')
            .then(function (exists) {
                if (!exists) {
                    return exec('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');
                }
            }).then(function () {
                return Q.nfcall(fs.readFile, '/root/.ssh/id_rsa.pub', 'utf8');
            }).then(function (sshContent) {
                info.sshContent = sshContent;
                return Q.nfcall(fs.readFile, '/web/web/assets/cloud-config.tmpl.yml', 'utf8');
            }).then(function (cloudConfigTemplate) {
                var cloudConfig = _.template(cloudConfigTemplate, {
                    'ID': clusterId,
                    'sshRsa': info.sshContent,
                });
                console.log(cloudConfig);
            });

    },
};

module.exports.create('test');
