// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var users = require('../app/model/db.js'),
    bcrypt = require('bcrypt'),
    Q = require('q');


module.exports = {

  login: function (req, res) {
    var query = {
      where: {
        username: req.data.username,
      },
    };

    return users.find(query)
      .then(function (user) {
        if (!user) {
          return {sucess: false};
        }

        return Q.nfcall(bcrypt.compare, req.data.password, user.password)
          .then(function (res) {
            return {success: res};
          });
      });
  },

};
