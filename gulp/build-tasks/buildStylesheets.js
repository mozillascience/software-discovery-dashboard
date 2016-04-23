import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import paths from '../util/paths';

gulp.task('build:stylesheets', () => {
  return gulp.src(paths.source.public.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.build.public.stylesheets));
});
