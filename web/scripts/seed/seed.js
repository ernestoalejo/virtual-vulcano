// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var Sequelize = require('sequelize'),
    _ = require('lodash');


var connection = new Sequelize('information_schema', 'root', '29d7a7a7c1be76eb6d1925ce7895a6d9', {
  host: process.env.DATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
});


var queries = [
  "CREATE DATABASE IF NOT EXISTS virtualvulcano;",
  "CREATE USER 'virtualvulcano'@'localhost' IDENTIFIED BY 'virtualvulcano';",
  "GRANT ALL ON virtualvulcano.* TO 'virtualvulcano'@'localhost' WITH GRANT OPTION;",
  "CREATE USER 'virtualvulcano'@'%' IDENTIFIED BY 'virtualvulcano';",
  "GRANT ALL ON virtualvulcano.* TO 'virtualvulcano'@'%' WITH GRANT OPTION;",
  function () {
    connection = new Sequelize('virtualvulcano', 'virtualvulcano', 'virtualvulcano', {
      host: process.env.DATABASE_PORT_3306_TCP_ADDR,
      dialect: 'mysql',
    });

    connection.sync();
  },
 ];

var current = 0;
var next = function () {
  var promise;
  if (_.isString(queries[current])) {
    promise = connection.query(queries[current]);
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


connection.query('SELECT user FROM mysql.user WHERE user="virtualvulcano"')
  .then(function (user) {
    if(!user) {
      next();
    }
  });
