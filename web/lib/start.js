'use strict';

// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

var crypto = require('crypto');
var exec = require('child-process-promise').exec;


module.exports = {
  start: function (service, ip) {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var id = crypto.createHash('sha1').update(current_date + random).digest('hex');

    return exec('scp core@' + ip + ' /web/assets/start.tmpl.sh /tmp/' + id + '.sh')
      .then (function () {
        return exec('ssh core@' + ip + '"cd /tmp && chmod +x ' + id + '.sh && ./' + id + '.sh"');
      });
  },
};


