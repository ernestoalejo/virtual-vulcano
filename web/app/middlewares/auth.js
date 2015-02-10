// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


module.exports = function (req, res, next) {
  if(!req.session.user && req.path!=='/accounts/login') {
    res.redirect('/accounts/login');
    return;
  }

  return next();
};
