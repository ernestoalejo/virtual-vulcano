// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var users = require('../model/user.js'),
    bcrypt = require('bcrypt'),
    templates = require('../lib/templates.js'),
    Q = require('q');


module.exports = {

  login: function (req, res) {
    var query = {
      where: {
        username: req.body.user,
      },
    };

    return users.find(query)
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

  changePassword: function (req, res) {
    var query = {
      where: {
        username: req.session.user,
      },
    };


    var currentUser;
    return users.find(query)
      .then(function (user) {
        currentUser = user;

        return Q.nfcall(bcrypt.genSalt, 10);
      })
      .then(function (salt) {
        return Q.nfcall(salt, req.body.password, salt);
      })
      .then(function (password) {
        return currentUser.update({
          password: password, 
        });
      })
      .then(function() {
        return {success: true};
      });
  },


  changePasswordForm: function (req, res) {    
    // if (!req.session.user) {
    //   return templates.render('vv.login');
    // }
    return templates.render('vv.changePassword');
  },

};

