// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var Q = require('q'),
    funcUtils = require('./func-utils'),
    _ = require('lodash');


var funcs;


beforeEach(function () {
  funcs = [];
});


afterEach(function (done) {
  var next = function () {
    if (funcs.length === 0) {
      done();
      return;
    }

    var fn = funcs.shift();
    Q.when(fn())
      .fin(function () {
        process.nextTick(next);
      })
      .done();
  };

  process.nextTick(next);
});


module.exports = {

  run: function (fn) {
    funcs.push(fn);
  },

  iterativePromisesFunc: function (/* arguments */) {
    var defers = arguments;
    if (defers.length === 1 && _.isArray(defers[0])) {
      defers = defers[0];
    }

    var promises = _.map(defers, function (defer) {
      return defer.promise;
    });

    return funcUtils.iterativeFakeFunc(promises);
  },

};
