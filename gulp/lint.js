import gulp from 'gulp';
import eslint from 'gulp-eslint';

const config = {
  extends: "airbnb",
  plugins: [ "react" ],
  env: { es6: true }
}

gulp.task('lint', () => {
  return gulp.src(['lib/*.js', 'public/javascripts/**'])
    .pipe(eslint(config))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
