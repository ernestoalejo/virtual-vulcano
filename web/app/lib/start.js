'use strict';

// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

var crypto = require('crypto'),
    childProccessPromise = require('child-process-promise');


module.exports = {

  _generateRandomId: function () {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
  },

  start: function (service, ip) {
    var id = this._generateRandomId();

    var scpCmd = 'scp core@' + ip + ' /web/assets/start.tmpl.sh /tmp/' + id + '.sh';
    return childProccessPromise.exec(scpCmd)
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


