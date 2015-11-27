'use strict';

var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');

gulp.task('styles', function() {

  if (!global.isProd) {

    return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }))
    .pipe(autoprefixer('last 2 versions", "> 1%", "ie 8'))
    .pipe(sourcemaps.write('./'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest));

  } else {

    return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: 'none',
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer('last 2 versions", "> 1%", "ie 8'))
    .on('error', handleErrors)
    .pipe(cssmin())
    .pipe(gulp.dest(config.styles.dest));

  }
});