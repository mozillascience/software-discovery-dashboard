import gulp from 'gulp';
import cached from 'gulp-cached';
import paths from '../util/paths';

gulp.task('build:html', () => {
  return gulp.src([paths.source.public.html])
    .pipe(cached('html'))
    .pipe(gulp.dest(paths.build.public.html));
});