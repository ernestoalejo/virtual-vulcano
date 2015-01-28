// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


var plugins = [
  {
    name: 'Project',
    url:  'http://es.wikipedia.org/wiki/Justiniano_I',
    icon: 'http://www.biografiasyvidas.com/biografia/j/fotos/justiniano.jpg',
  },
  
  {
    name: 'Change password',
    url:  'http://es.wikipedia.org/wiki/Justiniano_I',
    icon: 'http://www.biografiasyvidas.com/biografia/j/fotos/justiniano.jpg',
  },

  {
    name: 'Monitoring',
    url:  'http://es.wikipedia.org/wiki/Justiniano_I',
    icon: 'http://www.biografiasyvidas.com/biografia/j/fotos/justiniano.jpg',
  },

];


module.exports = {

  register: function (info) {
    plugins.push(info);
  },

  list: function () {
    return plugins;
  },

};
