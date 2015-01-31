// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var Sequelize = require('sequelize'),
    _ = require('lodash'),
    fs = require('fs'),
    bcrypt = require('bcrypt'),
    Q = require('q');


var connection = new Sequelize('information_schema', 'root', 'vvroot', {
  host: process.env.DATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
});


var db;


connection.query("SELECT schema_name FROM schemata WHERE schema_name = 'virtualvulcano'")
  .then(function (schemas) {
    if (schemas.length) {
      return;
    }

    return connection.query("CREATE DATABASE virtualvulcano;")
      .then(function () {
        db = require('./models/db');
        db.setup();

        // Create tables
        db.sequelize().sync();

        return Q.nfcall(bcrypt.genSalt, 10);
      })
      .then(function (salt) {
        return Q.nfcall(bcrypt.hash, 'virtualvulcano', salt);
      })
      .then(function (password) {
        // Create first initial user
        return db.model('user').create({
          username: 'virtualvulcano',
          password: password,
        })
      });
  })
  .done();
