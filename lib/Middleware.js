import express from 'express';
import { join } from 'path';

function notFoundError(req, res, next) {
  res.sendStatus(404);
};

function serverError(err, req, res, next) {
  res.send(err.status || 500, err);
}

const staticAssets = express.static(join(__dirname, '../public'));

const bowerComponents = express.static('bower_components');

export { notFoundError, serverError, staticAssets, bowerComponents };
