var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload')


gulp.task('jshint',function(){
  return gulp.src('[/**/*.js]')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch',function(){

  gulp.watch(['/**/*.js'],['jshint']);

});


gulp.task('mocha',function(){
  return gulp.src('spec/*.js',{read: false})
    .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['mocha','watch','webserver']);
