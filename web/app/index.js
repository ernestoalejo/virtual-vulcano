// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var app = require('./app');


// Start server
app.listen(8000, function () {
  console.log('server listening in http://localhost:8000');
});
