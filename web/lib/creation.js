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

        return Q.nfcall(fs.exists, '/root/.ssh/id_rsa')
            .then(function (exists) {
                console.log(sshContent);
                if (!exists) {
                    return exec('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');
                }
            }).then(function () {
                return Q.nfcall(fs.readFile, '/root/.ssh/id_rsa.pub');
            }).then(function (sshContent) {
                info.sshContent = sshContent;
                return Q.nfcall(fs.readFile, '/web/web/assets/cloud-config.tmpl.yml');
            }).then(function (cloudConfigTemplate) {
                var cloudConfig = _.template(cloudConfig, {
                    clusterId: clusterId,
                    ssh: info.sshContent,
                });

            });

    },
};


module.exports.create('ttaaat');
