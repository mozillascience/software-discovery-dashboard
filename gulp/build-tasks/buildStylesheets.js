import gulp from 'gulp';
import sass from 'gulp-sass';
import cached from 'gulp-cached';
import paths from '../util/paths';

gulp.task('build:stylesheets', () => {
  return gulp.src(paths.source.public.stylesheets)
    .pipe(cached('stylesheets'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.build.public.stylesheets));
});
