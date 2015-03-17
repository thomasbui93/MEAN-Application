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
var prettify = require('gulp-js-prettify');
var runSequence = require('run-sequence');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['build']);

// We have to use runSequence to force setting the environment before
// running any tasks. By default the tasks run in parallel, and I don't
// think the 'karma' task can depend on two different 'set-env' tasks...
gulp.task('build', function(cb) {
  runSequence('set-development', ['less', 'prettify', 'lint', 'inject', 'serve', 'watch', 'karma', 'jasmine'], cb);
});

gulp.task('test', function(cb) {
  runSequence('set-test', ['lint', 'karma', 'jasmine']);
});

gulp.task('set-development', function() {
  process.env.NODE_ENV = 'development';
});

gulp.task('set-test', function() {
  process.env.NODE_ENV = 'test';
});

var paths = {
  js: {
    allFiles: ['index.js', 'public/**/*.js', 'server/**/*.js'],
    angular: './public/',
    angularFiles: './public/**/*.js',
    serverFiles: "./server/**/*.js",
    server: './server/'
  },
  styles: {
    allFiles: ['./public/styles/less/**/*.less', './public/styles/css/**/*.css'],
    lessFiles: './public/styles/less/**/*.less',
    css: './public/styles/css/',
    cssFiles: './public/styles/css/**/*.css'
  },

  html: "./public/**/*.html",

  tests: {
    clientUnitSpecs: 'tests/unit/client/**/*.test.js',
    clientUnitPath: 'tests/unit/client/',
    serverUnitSpecs: 'tests/unit/server/**/*.test.js',
    serverUnitPath: 'tests/unit/server/'
  }
}

gulp.task('less', function() {
  return gulp.src(paths.styles.lessFiles)
    .pipe(less({
      paths: [cleancss]  
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.css))
    .pipe(reload({stream: true}));
});

gulp.task('prettify', function() {
  var options = {
    "wrap_attributes_indent_size": 2,
    "indent_size": 2,
    "space_before_conditional": true,
    "brace_style": "collapse",
    "space_after_anon_function": false
  }

  gulp.src(paths.js.angularFiles)
    .pipe(prettify(options))
    .pipe(gulp.dest(paths.js.angular));

  gulp.src(paths.js.serverFiles)
    .pipe(prettify(options))
    .pipe(gulp.dest(paths.js.server));
});

gulp.task('lint', function() {
  return gulp.src(paths.js.allFiles)
    .pipe(jshint('.jshintrc'))
    // .pipe(jscs('.jscsrc'))
    // .on('error', noop)
    // .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('inject', function () {
  var target = './public/index.html';

  gulp.src(target)
    .pipe(inject(
      gulp.src(paths.js.angularFiles)
        .pipe(angularFilesort()), {
          transform: function(filepath) {
            return "<script src=\"" + filepath.replace("/public", "") + "\"></script>";
          }
        }
    ))
    .pipe(inject(
      gulp.src(paths.styles.cssFiles), {
        transform: function(filepath) {
          return '<link type="text/css" rel="stylesheet" href="' + filepath.replace("/public", "") + '">';
        }
      }
    ))
    .pipe(gulp.dest('./public'))
    .pipe(reload({stream: true}));
});

gulp.task('nodemon', ['inject'], function() {
  nodemon({script: 'index.js'})
    .on('restart', function () {
      setTimeout(function() {
        reload({stream: false});
      }, 500);
    });
});

gulp.task('karma', ['nodemon'], function(done) {
  // 'gulp test' runs only once and exits.
  var runMode = process.env.NODE_ENV === 'test' ? true : false;

  setTimeout(function(){
    karma.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: runMode
    });
  }, 500);
});

gulp.task('serve', ['nodemon'], function() {
 var port = process.env.PORT || 8080;

  setTimeout(function() {
    browserSync({
      proxy: 'localhost:' + port,
      port: 8000,
      ui: false
    });
  }, 500);
});

gulp.task('jasmine', ['nodemon'], function() {
  setTimeout(function() {
    gulp.src(paths.tests.serverUnitSpecs)
      .pipe(jasmine());
    }, 1000);
});

gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.styles.lessFiles, ['less']);
  gulp.watch(paths.styles.cssFiles, ['inject']);
  gulp.watch(paths.html, reload);
  gulp.watch(paths.js.allFiles, ['lint', reload]);
  gulp.watch(paths.js.angularFiles, ['inject']);
});