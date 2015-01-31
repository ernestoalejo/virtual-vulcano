// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var plugins = require('../lib/plugins'),
    db = require('../models/db'),
    bcrypt = require('bcrypt'),
    promised = require('../middlewares/promised'),
    templates = require('../lib/templates.js'),
    Q = require('q');


var changePassword = function (req, res) {
  var query = {
    where: {
      username: req.session.user,
    },
  };

  var currentUser;
  return db.model('user').find(query)
    .then(function (user) {
      currentUser = user;

      return Q.nfcall(bcrypt.compare, req.body.password, user.password);
    })
    .then(function (res) {
      if(res){
        throw new Error('password not valid');
      }
      
      req.session.user = user.username;
      return Q.nfcall(bcrypt.genSalt, 10);
    })
    .then(function (salt) {
      return Q.nfcall(bcrypt.hash, req.body.password, salt);
    })
    .then(function (password) {
      return currentUser.update({
        password: password, 
      });
    })
    .then(function() {
      return {success: true};
    });
};


var changePasswordForm = function (req, res) {    
  if (!req.session.user) {
    return templates.render(req, 'vv.login');
  }

  return templates.render(req, 'vv.changePassword');
};


plugins.register({
  name: 'Change password',
  url:  '/accounts/change-password',
  icon: 'fa-pencil-square-o',
  routes: function (app) {
    app.post('/api/accounts/change-password', promised(changePassword));
    app.get('/accounts/change-password', promised(changePasswordForm));
  },
});
