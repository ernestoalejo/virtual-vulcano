// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var crypto = require('crypto'),
    childProccessPromise = require('child-process-promise'),
    fs = require('fs'),
    _ = require('lodash'),
    Q = require('q');


module.exports = {

  _generateRandomId: function () {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
  },

  start: function (service, ip) {
    var id = this._generateRandomId().substring(0, 8);

    return Q.nfcall(fs.readFile, 'app/assets/start.tmpl.sh', 'utf-8')
      .then(function (data) {
        var contents = _.template(data, {
          id: id,
        });

        return Q.nfcall(fs.writeFile, '/tmp/' + id + '.sh', contents);
      })
      .then(function () {
        var scpCmd = 'scp /tmp/' + id + '.sh core@' + ip + ':/tmp/' + id + '.sh';
        return childProccessPromise.exec(scpCmd);
      })
      .then(function () {
        return Q.nfcall(fs.writeFile, '/tmp/' + id + '.service', service)
      })
      .then(function () {
        var writeFileCmd = 'scp /tmp/' + id + '.service core@' + ip + ':/tmp/' + id + '.service';
        return childProccessPromise.exec(writeFileCmd);
      })
      .then(function () {
        var remote = [
          'cd /tmp',
          'chmod +x ' + id + '.sh',
          './' + id + '.sh',
        ];

        var sshCmd = 'ssh core@' + ip + ' "' + remote.join(' && ') + '"';
        return childProccessPromise.exec(sshCmd);
      });
  },

};


