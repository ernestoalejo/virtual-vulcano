// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var sequelize = require('../../app/model/db.js');


sequelize.query('SELECT user FROM mysql.user WHERE user="virtualvulcano"')
  .then(function (user) {
    if(user) {
      return;
    }
    
    return sequelize.query("CREATE USER 'virtualvulcano'@'%' IDENTIFIED BY 'virtualvulcano';", {raw: true});
  })
  .done();
