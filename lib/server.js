import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import { join as joinPaths } from 'path';
import indexRoute from './index';
import searchRoute from './search';

const app = express();

// Middleware configurations
const publicPath = joinPaths(__dirname, '../public');
app.use(express.static(publicPath));
app.use(express.static('bower_components'));
app.set('view engine', 'jade');
app.use(sassMiddleware({
  src: publicPath,
  dest: joinPaths(publicPath, 'dist'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/public'
}));

app.use('/', indexRoute);
app.use('/search', searchRoute);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(3000);
console.log("App listening on localhost:3000")
