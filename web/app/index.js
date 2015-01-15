// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    base = require('./handlers/base'),
    ejs = require('ejs'),
    path = require('path'),
    promised = require('./middlewares/promised'),
    bodyParser = require('body-parser');


var app = express();


// Register engines
app.engine('html', ejs.renderFile);

// Configurations
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

// Middlewares
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// Base handler
app.get('/', base.base);
app.get('/:s1', base.base);
app.get('/:s1/:s2', base.base);
app.get('/:s1/:s2/:s3', base.base);


// Start server
app.listen(8080, function () {
  console.log('server listening in http://localhost:8080');
});

