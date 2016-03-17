import gulp from 'gulp';
import jasmine from 'gulp-jasmine';

const config = {
    spec_dir: './spec',
    helpers: [
        "../node_modules/babel-core/register.js"
    ]
}

gulp.task('test', () => {
  return gulp.src('./spec/**/*[sS]pec.js')
    .pipe(jasmine({ config }));
});
