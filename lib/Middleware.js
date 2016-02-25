import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import { join as joinPaths } from 'path';

function notFoundError(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

function serverError(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
}

const publicPath = joinPaths(__dirname, '../public');
const staticAssets = express.static(publicPath);
const sassTranspiling = sassMiddleware({
  src: publicPath,
  dest: publicPath,
  debug: true,
  outputStyle: 'compressed'
});

const bowerComponents = express.static('bower_components');

export { notFoundError, serverError, sassTranspiling, staticAssets, bowerComponents };
