import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import paths from '../util/paths';

gulp.task('build:javascripts', () => {
  return browserify({ extensions: ['.jsx'] })
    .transform(babelify, {presets: ['es2015', 'react']})
    .add(paths.source.public.jsxMain)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.build.public.javascripts));
});
