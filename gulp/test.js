import gulp from 'gulp';
import jasmine from 'gulp-jasmine';
import paths from './util/paths';

const config = {
    spec_dir: './spec',
    helpers: [
        "../node_modules/babel-core/register.js"
    ]
}

gulp.task('test', () => {
  return gulp.src(paths.source.tests)
    .pipe(jasmine({ config }));
});
