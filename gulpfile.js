const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cache = require('gulp-cached'),
    jshint = require('gulp-jshint');
    jest = require('jest-cli');

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('**/__tests__/**/*.js', ['test']);
    gulp.watch('public/stylesheets/*.scss', ['sassBuild']);
    gulp.watch(['**/*.js', '!node_modules/**', '!bower_components/**', '!build/**'], ['jsBuild']);
    gulp.watch('views/**/*.jade', ['moveViews']);
});

gulp.task('liveResetting', function() {
    return nodemon({
        script: 'build/bin/www',
        ext: 'js jade css',
        watch: ['build/'],
        stdout: false,
        ignore: ['**/__tests__/**/*.js'] 
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

gulp.task('jsonMove', function() {
    return gulp.src(['**/*.json', '!node_modules/**', '!bower_components/**', '!build/**'])
        .pipe(cache('moveJson'))
        .pipe(gulp.dest('build'));
});

gulp.task('jsBuild', function() {
    return gulp.src(['**/*.js', '!node_modules/**', '!bower_components/**', '!build/**'])
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
    return del(['build/**/*'], callback);
});

gulp.task('build', function(callback) {
    return runSequence('clean', ['jsonMove', 'jsBuild', 'sassBuild', 'imgMove', 'moveViews'], callback);
});

gulp.task('test', ['jsBuild'], function(callback) {
    jest.runCLI({ 'onlyChanged': true, verbose: true }, __dirname, (result) => {
        if (result) {
            console.log("Success!!");
        } else {
            console.log("Faiiilure");
        }
        callback();
    });
});

gulp.task('productionBuild', function(callback) {
    return runSequence('build', 'moveDependencies', callback);
});

gulp.task('moveDependencies', function(callback) {
    return gulp.src(['node_modules/**/*', 'bower_components/**/*'], {base: './'})
        .pipe(gulp.dest('build'));
});

gulp.task('develop', function(callback) {
    return runSequence('build', 'watch', 'liveResetting', callback);
});
