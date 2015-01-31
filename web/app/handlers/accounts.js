// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var db = require('../models/db'),
    bcrypt = require('bcrypt'),
    Q = require('q');


module.exports = {

  login: function (req, res) {
    var query = {
      where: {
        username: req.body.user,
      },
    };

    return db.model('user').find(query)
      .then(function (user) {
        if (!user) {
          return {success: false};
        }

        return Q.nfcall(bcrypt.compare, req.body.password, user.password)
          .then(function (res) {
            if(res){
              req.session.user = user.username;
            }

            return {success: res};
          });
      });
  },

  logout: function (req) {
    return Q.ninvoke(req.session, 'destroy')
      .then(function() {
        return {success: true};
      });
  },

};

