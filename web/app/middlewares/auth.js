// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var urls = [
  '/accounts/login',
  '/api/accounts/login',
];

module.exports = function (req, res, next) {
  var redirect = urls.some(function (url) {
    return (req.path === url);
  });

  if(!req.session.user && !redirect) {
    res.redirect('/accounts/login');
    return;
  }

  return next();
};
