// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


gulp.task('default', function () {
  $.util.log($.util.colors.red('Specify a task!'));
});


gulp.task('test', function () {
    return gulp.src('lib/**/*.spec.js')
        .pipe($.jasmine());
});
