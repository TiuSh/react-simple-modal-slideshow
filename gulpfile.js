var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('build', function(cb) {
  runSequence(['build:lib', 'build:example'], cb);
});

gulp.task('build:lib', function() {
  var js = gulp.src('./src/*.jsx')
    .pipe(webpackStream({
      entry: './src/SimpleModalSlideshow.jsx',
      output: {
        filename: 'SimpleModalSlideshow.js',
        libraryTarget: 'commonjs2',
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          ignore: 'node_modules/',
          loader: 'babel-loader',
        }],
      },
      externals: [
        'react',
        'react-addons-css-transition-group'
      ],
      devtool: 'source-map',
    }))
    .pipe(gulp.dest('./lib'));

  var css = gulp.src('./src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./lib'));

  return merge(js, css);
});

gulp.task('build:example', function() {
  var js = gulp.src('./example/src/*.jsx')
    .pipe(webpackStream({
      entry: './example/src/example.jsx',
      output: {
        filename: 'example.js',
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          ignore: 'node_modules/',
          loader: 'babel-loader',
        }],
      },
      resolve: {
        alias: {
          'react-simple-modal-slideshow': '../../lib/SimpleModalSlideshow.js',
        },
      },
      devtool: 'source-map',
    }))
    .pipe(gulp.dest('./example/dist'));

  var css = gulp.src('./example/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./example/dist'));

  return merge(js, css);
});

gulp.task('dev', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('./src/*', ['build']);
  gulp.watch('./example/src/*', ['build:example']);
  gulp.watch('./example/dist/*', browserSync.reload);
  gulp.watch('./index.html', browserSync.reload);
});
