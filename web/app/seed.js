// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var Sequelize = require('sequelize'),
    _ = require('lodash'),
    fs = require('fs'),
    bcrypt = require('bcrypt'),
    Q = require('q');


var connection = new Sequelize('information_schema', 'root', '29d7a7a7c1be76eb6d1925ce7895a6d9', {
  host: process.env.DATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
});


connection.query("SELECT schema_name FROM schemata WHERE schema_name = 'virtualvulcano'")
  .then(function (schemas) {
    if (schemas.length) {
      return;
    }

    return connection.query("CREATE DATABASE virtualvulcano;")
      .then(function () {
        _(fs.readdirSync('app/models'))
          .filter(function (script) {
            return script !== 'db.js';
          })
          .each(function (script) {
            require('./models/' + script);
          });

        // Create tables
        require('./models/db').sync();

        return Q.nfcall(bcrypt.genSalt, 10);
      })
      .then(function (salt) {
        return Q.nfcall(salt, 'virtualvulcano', salt);
      })
      .then(function (password) {
        var User = require('./models/user.js');
        return User.create({
          username: 'virtualvulcano',
          password: password,
        });
      });
  })
  .done();
