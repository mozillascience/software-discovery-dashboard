import express from 'express';
import { join } from 'path';

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

const staticAssets = express.static(join(__dirname, '../public'));

const bowerComponents = express.static('bower_components');

export { notFoundError, serverError, staticAssets, bowerComponents };
