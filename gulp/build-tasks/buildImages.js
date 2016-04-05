import gulp from 'gulp';
import cached from 'gulp-cached';
import paths from '../util/paths';

gulp.task('build:images', () => {
  gulp.src([paths.source.public.images])
    .pipe(cached('images'))
    .pipe(gulp.dest(paths.build.public.images));
});
