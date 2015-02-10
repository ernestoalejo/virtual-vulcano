// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    path = require('path'),
    promised = require('./middlewares/promised'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    _ = require('lodash'),
    fs = require('fs'),
    db = require('./models/db'),
    plugins = require('./lib/plugins');


// Set up models
db.setup();


var app = express();


// Middlewares
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser())
app.use(session({
  name: 'SID',
  secret: 'VirtualVulcano',
  rolling: true,
  resave: false,
  proxy: false,
  saveUninitialized: false,
  store: db.sessionsSequelizeStore(),
}));
app.use(bodyParser.json());


// Setup plugins
_.each(fs.readdirSync('app/plugins'), function (file) {
  // Ignore test files
  if (file.indexOf('.test.js') > -1) {
    return;
  }

  require('./plugins/' + file);
});
_.each(plugins.list(), function (plugin) {
  plugin.routes(app);
});


module.exports = app;
