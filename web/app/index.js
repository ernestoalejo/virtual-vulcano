// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    dashboard = require('./handlers/dashboard'),
    path = require('path'),
    promised = require('./middlewares/promised'),
    bodyParser = require('body-parser'),
    session = require('express-session');


var app = express();


// Middlewares
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(session({
  name: 'SID',
  rolling: true,
  resave: false,
  proxy: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());

// Dashboard handler
app.get('/', promised(dashboard.dashboard));

app.post('/api/accounts/login', promised(accounts.login));


// Start server
app.listen(8080, function () {
  console.log('server listening in http://localhost:8080');
});

