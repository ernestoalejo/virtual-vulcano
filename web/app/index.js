// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    dashboard = require('./handlers/dashboard'),
    path = require('path'),
    promised = require('./middlewares/promised'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    accounts = require('./handlers/accounts'),
    _ = require('lodash'),
    fs = require('fs'),
    db = require('./models/db'),
    plugins = require('./lib/plugins');


// Set up models
db.setup();


var app = express();


// Middlewares
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(session({
  name: 'SID',
  secret: 'VirtualVulcano',
  rolling: true,
  resave: false,
  proxy: false,
  saveUninitialized: false,
}));
app.use(bodyParser.json());


// Dashboard handler
app.get('/', promised(dashboard.dashboard));


// Accounts
app.post('/api/accounts/login', promised(accounts.login));
app.post('/api/accounts/logout', promised(accounts.logout));


// Setup plugins
_.each(fs.readdirSync('app/plugins'), function (file) {
  require('./plugins/'+file);
});
_.each(plugins.list(), function (plugin) {
  plugin.routes(app);
});


// Start server
app.listen(8000, function () {
  console.log('server listening in http://localhost:8000');
});
