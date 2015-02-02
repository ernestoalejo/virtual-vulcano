// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var request = require('supertest'),
    app = require('../app');


describe('dashboard handler', function () {

  it('should send the dashboard', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

});
