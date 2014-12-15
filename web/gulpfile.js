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
    return gulp.src('app/lib/**/*.spec.js')
        .pipe($.jasmine());
});


gulp.task('lint:jshint', function () {
    gulp.src('**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('lint:jscs', function () {
    return gulp.src('**/*.js')
        .pipe(jscs());
});


gulp.task('lint', ['lint:jshint','lint:jscs']);
