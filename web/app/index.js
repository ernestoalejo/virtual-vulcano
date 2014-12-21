// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

require('./models/database');

var express = require('express'),
    clusters = require('./handlers/clusters'),
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

// Handlers
app.delete('/api/v1/clusters/:id', promised(clusters.destroy));
app.get('/api/v1/clusters', promised(clusters.list));
app.get('/api/v1/clusters/:id', promised(clusters.show));
app.get('/api/v1/clusters/:id/install', promised(clusters.install));
app.post('/api/v1/clusters', promised(clusters.create));
app.post('/api/v1/clusters/:id/run', promised(clusters.run));
app.put('/api/v1/clusters/:id', promised(clusters.update));

app.get('/', base.base);
app.get('/:s1', base.base);
app.get('/:s1/:s2', base.base);
app.get('/:s1/:s2/:s3', base.base);

// Start server
app.listen(8080, function () {
  console.log('server listening in http://localhost:8080');
});

