// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var plugins = require('../lib/plugins'),
    templates = require('../lib/templates.js'),
    promised = require('../middlewares/promised');


var createProjectForm = function(req) {
  return templates.render(req, 'vv.createProjects');
};


var listProjects = function (req) {
  return templates.render(req, 'vv.projects');
};


var createProject = function(req) {
  console.log(req.body.name);
};


plugins.register({
  dashboard: {
    name: 'Projects',
    url:  '/projects',
    icon: 'fa-code-fork',
  },
  
  routes: function (app) {
    app.get('/projects', promised(listProjects));
    app.get('/projects/create', promised(createProjectForm));
    app.post('/api/projects/create', promised(createProject));
  },
});
