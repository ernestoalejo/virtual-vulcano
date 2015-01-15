// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var _ = require('lodash')


module.exports = {

  iterativeFakeFunc: function (/* arguments */) {
    var items = arguments;
    if (items.length === 1 && _.isArray(items[0])) {
      items = items[0];
    }

    var idx = 0;

    return function () {
      if (idx >= items.length) {
        throw new Error('iterative fake func has ' + items.length + ' parameters ' +
            'but was called at least ' + (idx + 1) + ' times');
      }

      var item = items[idx];
      idx++;

      return item;
    };
  },

};
