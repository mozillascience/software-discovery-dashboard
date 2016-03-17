import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import paths from './util/paths';

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.source.server, ['build:server']);
  gulp.watch(paths.source.public.javascripts, ['build:javascripts']);
  gulp.watch(paths.source.public.stylesheets, ['build:stylesheets']);

  nodemon({
    script: './dist/lib/server.js',
    watch: ['./dist/lib'],
    ext: 'js'
  })
});
