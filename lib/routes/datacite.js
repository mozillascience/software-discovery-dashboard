import express from 'express';
import { dataciteHelper } from './util/dataciteHelper';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', (req, res, next) => {
  dataciteHelper(req, res, next, false);
});

router.get('/searchWithGithub', (req, res, next) => {
  dataciteHelper(req, res, next, true);
});

export default router;
