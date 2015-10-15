var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass'),
  babel = require('gulp-babel'),
  del = require('del'),
  runSequence = require('run-sequence'),
  cache = require('gulp-cached');

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('public/stylesheets/*.scss', ['sassBuild']);
  gulp.watch(['**/*.js', '!node_modules/**', '!build/**'], ['jsBuild']);
  gulp.watch('views/**/*.jade', ['moveViews']);
});

gulp.task('liveResetting', function() {
  return nodemon({
    script: 'build/bin/www',
    ext: 'js jade css',
    stdout: false,
    watch: ['build/'] 
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('moveDependencies', function() {
   return gulp.src('node_modules/**/*')
     .pipe(gulp.dest('build/node_modules'));
});

gulp.task('moveViews', function() {
    return gulp.src('views/**/*.jade')
      .pipe(cache('moveViews'))
      .pipe(gulp.dest('build/views'));
});

gulp.task('sassBuild', function() {
  return sass('public/stylesheets/**/*.scss')
    .pipe(cache('sassBuild'))
    .pipe(gulp.dest('build/public/css'));
});

gulp.task('jsBuild', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(cache('jsBuild'))
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(callback) {
  return del(['build/**/*'], callback);
});

gulp.task('build', function(callback) {
  return runSequence('clean', 'moveDependencies', ['jsBuild', 'sassBuild', 'moveViews'], callback);
});

gulp.task('develop', function(callback) {
  return runSequence('build', 'watch', 'liveResetting', callback);
});
