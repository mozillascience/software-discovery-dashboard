import gulp from 'gulp';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import paths from '../util/paths';

gulp.task('build:server', () => {
  return gulp.src(paths.source.server)
    .pipe(cache('server'))
    .pipe(babel())
    .pipe(gulp.dest(paths.build.server));
});
