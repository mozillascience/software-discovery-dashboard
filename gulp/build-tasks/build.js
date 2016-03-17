import gulp from 'gulp';

gulp.task('build', [
  'build:javascripts',
  'build:stylesheets',
  'build:images',
  'build:server'
]);
