// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var _ = require('lodash');


// Cannot use a simple middleware because we need the return value of the
// handler, so we need to wrap the real function.
module.exports = function (handler) {
  return function (req, res) {
    handler(req, res)
      .then(function (data) {
        if (_.isString(data)){
          res.send(data);
        } else {
          res.json(data);
        }
      })
      .done();
  };
};
