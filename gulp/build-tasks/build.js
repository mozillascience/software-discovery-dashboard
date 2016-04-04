import gulp from 'gulp';

gulp.task('build', [
  'build:html',
  'build:javascripts',
  'build:stylesheets',
  'build:images',
  'build:server'
]);
