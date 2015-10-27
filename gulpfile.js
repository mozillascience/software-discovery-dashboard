const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cache = require('gulp-cached'),
    jshint = require('gulp-jshint');

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('./bower.json', ['moveBowerDependencies']);
    gulp.watch('./package.json', ['moveNodeDependencies']);
    gulp.watch('public/stylesheets/*.scss', ['sassBuild']);
    gulp.watch(['**/*.js', '!node_modules/**', '!build/**'], ['jsBuild']);
    gulp.watch('views/**/*.jade', ['moveViews']);
});

gulp.task('liveResetting', function() {
    return nodemon({
        script: 'build/bin/www',
        ext: 'js jade css',
        watch: ['build/'],
        stdout: false 
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

gulp.task('jsHint', function() {
    return gulp.src(['**/*.js', '!node_modules/**', '!bower_components/**', '!build/**'])
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter('default'));
});

gulp.task('moveNodeDependencies', function() {
  return gulp.src('node_modules/**/*')
     .pipe(gulp.dest('build/node_modules'));
});

gulp.task('moveBowerDependencies', function() {
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('build/bower_components'));
});

gulp.task('moveViews', function() {
    return gulp.src('views/**/*.jade')
        .pipe(cache('moveViews'))
        .pipe(gulp.dest('build/views'));
});

gulp.task('sassBuild', function() {
    return gulp.src('public/stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cache('sassBuild'))
        .pipe(gulp.dest('build/public/stylesheets'));
});

gulp.task('jsBuild', function() {
    return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
        .pipe(cache('jsBuild'))
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('imgMove', function() {
  return gulp.src('public/images/**/*')
    .pipe(cache('imgMove'))
    .pipe(gulp.dest('build/public/images'));
});

gulp.task('clean', function(callback) {
    cache.caches = {};
    return del(['build/**/*', '!node_modules/**'], callback);
});

gulp.task('build', function(callback) {
    return runSequence('clean', ['jsBuild', 'sassBuild', 'imgMove', 'moveViews'], callback);
});

gulp.task('develop', function(callback) {
    return runSequence('build', 'watch', 'liveResetting', callback);
});
