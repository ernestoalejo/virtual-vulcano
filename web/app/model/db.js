// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict'

var Sequelize = require('sequelize');

var sequelize = new Sequelize('virtualvulcano', 'virtualvulcano', 'virtualvulcano', {
  host: process.env.WEBDATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
});

module.exports = sequelize.define('User', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
});

