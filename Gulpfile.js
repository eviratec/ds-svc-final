"use strict";

var gulp = require('gulp');
var watch = require('gulp-watch');
var filter = require('gulp-filter');

var fork = require('child_process').fork;

gulp.task('test', function (cb) {
  fork('node_modules/jasmine/bin/jasmine.js', {cwd: __dirname});
});

gulp.task('dev', function () {
  return watch('**/*.js', { readDelay: 2000 }, function () {
    fork('node_modules/jasmine/bin/jasmine.js', {cwd: __dirname});
  });
});
