// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var Sequelize = require('sequelize'),
    _ = require('lodash'),
    db = require('../model/db');


var queries = [
  "CREATE DATABASE IF NOT EXISTS virtualvulcano;",
  function () {
    db.sync();
  },
 ];

var current = 0;
var next = function () {
  var promise;
  if (_.isString(queries[current])) {
    promise = db.query(queries[current]);
  } else {
    promise = queries[current]();
  }
  if (!promise) {
    return;
  }

  promise.then(function () {
    current++;
    next();
  });
};


db.query('SELECT user FROM mysql.user WHERE user="virtualvulcano"')
  .then(function (user) {
    if(!user) {
      next();
    }
  });
