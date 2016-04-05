import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import paths from './util/paths';
import { join } from 'path';

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.source.server, ['build:server']);
  gulp.watch(paths.source.public.javascripts, ['build:javascripts']);
  gulp.watch(paths.source.public.stylesheets, ['build:stylesheets']);

  nodemon({
    script: join(paths.build.server, 'server'),
    watch: [paths.build.server],
    ext: 'js'
  })
});
