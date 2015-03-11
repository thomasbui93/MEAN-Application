'use strict';

// This should get refactored a litte bit especially the file paths and how the main tasks are organised

var gulp = require('gulp');
var noop = function() {}
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var beautify = require('gulp-beautify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('default', ['build']);

gulp.task('build', ['less', 'lint', 'serve', 'watch']);

var allProjectFiles = ['index.js', 'public/**/**', 'server/**/**']

gulp.task('less', function() {
  return gulp.src('./public/styles/less/*.less')
    .pipe(less({
      paths: [cleancss]  
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public/styles/css'))
    .pipe(reload({stream: true}));
});
 
gulp.task('beautify', function() {
  gulp.src('public/**/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./public/'));

  gulp.src('server/**/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./server/'));
});

gulp.task('lint', function() {
  return gulp.src(['index.js', 'public/**/*.js', 'server/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jscs('.jscsrc'))
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('inject' ,function () {
  //del(['public/index.html']);
  gulp.src('./public/index.html')
    .pipe(inject(
      gulp.src('./public/app/**/*.js')
        .pipe(angularFilesort())
    ))
    .pipe(gulp.dest('./public'));
});

gulp.task('nodemon', ['inject'], function() {
  nodemon({script: 'index.js'})
    .on('restart', function () {
      setTimeout(function() {
        reload({stream: false});
      }, 500);
    });
});

gulp.task('serve', ['nodemon'], function() {
 var port = process.env.PORT || 8080;

  browserSync({
    proxy: 'localhost:' + port,
    port: 8000,
    ui: false
  });
});

gulp.task('watch', ['serve'], function() {
  gulp.watch("./public/styles/less/*.less", ['less']);
  gulp.watch("./public/styles/css/*.css", reload);
  gulp.watch("./public/**/*.html", reload);
  gulp.watch(["./public/**.*.js", "./server/**/*.js"], ['lint']);
});