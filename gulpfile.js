'use strict';

// TODO Add different options for dev/production/test

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
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var karma = require('karma').server;

gulp.task('default', ['build']);

gulp.task('build', ['less', 'lint', 'serve', 'watch']);

var paths = {
  js: {
    allFiles: ['index.js', 'public/**/*.js', 'server/**/*.js'],
    angular: './public/app/**/*.js',
    server: "./server/**/*.js"
  },
  styles: {
    allFiles: ['./public/styles/less/*.less', './public/styles/css'],
    less: './public/styles/less/*.less',
    css: './public/styles/css'
  },

  html: "./public/**/*.html"
}

gulp.task('less', function() {
  return gulp.src(paths.styles.less)
    .pipe(less({
      paths: [cleancss]  
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.css))
    .pipe(reload({stream: true}));
});

gulp.task('lint', function() {
  return gulp.src(paths.js.allFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jscs('.jscsrc'))
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('inject' ,function () {
  gulp.src('./public/index.html')
    .pipe(inject(
      gulp.src(paths.js.angular)
        .pipe(angularFilesort())
    ))
    .pipe(gulp.dest(''));
});

gulp.task('nodemon', ['inject'], function() {
  nodemon({script: 'index.js'})
    .on('restart', function () {
      setTimeout(function() {
        reload({stream: false});
      }, 500);
    });
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
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
  gulp.watch(paths.styles.less, ['less']);
  gulp.watch(paths.styles.css, reload);
  gulp.watch(paths.html, reload);
  gulp.watch(paths.js.allFiles, ['lint']);
});