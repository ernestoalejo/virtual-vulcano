// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var sequelize = require('./db.js'),
    Sequelize = require('sequelize');


module.exports = sequelize.define('User', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
});