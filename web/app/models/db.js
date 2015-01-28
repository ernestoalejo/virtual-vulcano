// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict'

var Sequelize = require('sequelize');


module.exports = new Sequelize('virtualvulcano', 'root', '29d7a7a7c1be76eb6d1925ce7895a6d9', {
  host: process.env.DATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
});

