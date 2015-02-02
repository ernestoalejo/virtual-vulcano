// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var plugins = require('./plugins');


describe('plugins register', function () {

  beforeEach(plugins._reset);

  it('should return an empty list', function () {
    expect(plugins.list()).toEqual([]);
  });

  it('should store the plugins list', function () {
    plugins.register('foo');
    expect(plugins.list()).toEqual(['foo']);
  });

});
