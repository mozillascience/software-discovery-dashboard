import express from 'express';
import { isEmpty } from 'lodash';
import { searchFigshare } from '../repository-clients/figshare-client';
import { parseJsonLdToFigshareQueryParams } from '../repository-mappers/figshare-mapper';
import { isRepoQueryParamValid, parseJsonLdQueryParams } from './QueryParamParser'

const router = express.Router();

router.get('/', (req, res, next) => {
    const jsonLdQuery = parseJsonLdQueryParams(req.query);
    if (isRepoQueryParamValid(req.query.repo) && !isEmpty(jsonLdQuery)) {
      const figshareQueryParams = parseJsonLdToFigshareQueryParams(jsonLdQuery);
      searchFigshare(figshareQueryParams).then((data) => {
        res.send(data);
      }).catch((err) => {
        console.log('Error occured searching Figshare repository: ', err);
        next(err);
      });
    } else {
      console.error('Error occured parsing query parameters for search');
      next(new Error('Search query params invalid'));
    }
});

export default router;
