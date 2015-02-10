// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


var lint = function (conf, files) {
  return gulp.src(files)
    .pipe($.jshint('lint/' + conf + '.json'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .on('error', function (err) {
      process.exit(1);
    });
};


gulp.task('default', function () {
  $.util.log($.util.colors.red('Specify a task!'));
});


gulp.task('test', function () {
  return gulp.src('app/**/*.test.js')
    .pipe($.jasmine());
});


gulp.task('lint:jshint:node', function () {
  return lint('node', [
    'app/**/*.js',
    '!app/**/*.test.js',
    '!app/static/**/*.js',
  ]);
});


gulp.task('lint:jshint:browser', function () {
  return lint('browser', [
    'app/static/**/*.js',
    '!app/**/*.test.js',
    '!app/static/vendor/**/*.js',
  ]);
});


gulp.task('lint:jshint:tests', function () {
  return lint('browser', [
    'app/static/**/*.js',
    '!app/**/*.test.js',
    '!app/static/vendor/**/*.js',
  ]);
});


gulp.task('lint:jscs', function () {
    var files = [
      'app/**/*.js',
      '!app/static/vendor/**/*.js',
    ];

    return gulp.src(files)
        .pipe($.jscs('lint/jscs.json'));
});


gulp.task('lint', [
  'lint:jshint:node',
  'lint:jshint:client', 
  'lint:jscs'
  ]);


gulp.task('serve', function () {
  $.nodemon({
    script: 'app/index.js',
    ext: 'html js css',
    ignore: ['node_modules'],
  });
});
