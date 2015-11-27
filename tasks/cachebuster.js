'use strict';

var config = require('../config');
var gulp = require('gulp');
var fs = require('fs');
var rewriteCssUrls = require('css-url-rewriter');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('cache-buster', function(cb) {

  cb = cb || function() {};

  var path = config.styles.dest + '/main.css';
  var time = new Date().getTime()
  var css = fs.readFileSync(path, 'utf8');
  var tmplData = {
    version : time
  };
  var newCss = rewriteCssUrls(css, function(url) {
    return url + '?v=' + time
  });
  fs.writeFileSync(path, newCss);

  gulp.src('app/base/index.hbs')
    .pipe(handlebars(tmplData, {}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('cms/static/'));

  cb();
});