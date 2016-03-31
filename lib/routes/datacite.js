import express from 'express';
import { searchDatacite } from '../repository-clients/datacite-client';

const router = express.Router();

router.get('/search', (req, res, next) => {
    const q = "hyrogen";
    searchDatacite(q).then((repos) => {
      res.send(repos);
    }).catch(err => {
      console.error('Error occured searching Figshare for "%s"', search_for, err);
      next(err);
    });

  /*else {
    const err = new Error(strFormat('Query parameters %j not valid for figshare search', req.query));
    err.status = 422;
    console.error(err.message);
    next(err);
  }*/
});

export default router;