import gulp from 'gulp';
import eslint from 'gulp-eslint';
import paths from './util/paths';

const config = {
  extends: 'airbnb',
  plugins: [ 'react' ],
  env: { es6: true },
  rules: {'no-console': 0, 'prefer-template': 0},
}

gulp.task('lint', () => {
  return gulp.src([paths.source.server, paths.source.public.javascripts])
    .pipe(eslint(config))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
