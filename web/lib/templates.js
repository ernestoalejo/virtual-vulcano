// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var soynode = require('soynode/lib/soynode'),
    Q = require('q');


soynode.setOptions({
  outputDir: '/tmp/templates',
});


module.exports = {

  render: function (name, data) {
    return Q.nfcall(soynode.compileTemplates, 'app/templates')
      .then(function () {
        return soynode.render(name, data);
      });
  },
}


