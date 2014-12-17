// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    clusters = require('./handlers/clusters'),
    base = require('./handlers/base'),
    ejs = require('ejs'),
    path = require('path'),
    promised = require('./middlewares/promised');


var app = express();


app.engine('html', ejs.renderFile);


app.set('views', __dirname + '/templates');
app.set('view engine', 'html');


app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/clusters', promised(clusters.list));
app.get('/clusters/:id', promised(clusters.show));
app.delete('/clusters/:id', promised(clusters.destroy));
app.get('/clusters', promised(clusters.create));
app.put('/clusters/:id', promised(clusters.update));

app.get('/', base.base);


app.listen(8080, function () {
  console.log('server listening in http://localhost:8080');
});

