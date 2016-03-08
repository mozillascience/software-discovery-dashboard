import express from 'express';
import { format as strFormat } from 'util';
import { isEmpty, map, flatMap, flatten } from 'lodash';
import { searchFigshare, getL2Article } from '../repository-clients/figshare-client';
import { parseL2ArticlePresenters } from '../repository-mappers/figshare/parseL2ArticlePresenters'
import { isRepoQueryParamValid, parseJsonLdQueryParams } from './QueryParamParser'

const router = express.Router();

router.get('/', (req, res, next) => {
    const jsonLdQuery = parseJsonLdQueryParams(req.query);
    if (isRepoQueryParamValid(req.query.repo) && !isEmpty(jsonLdQuery)) {
      const search_for = flatten(flatMap(jsonLdQuery)).join(' ');

      searchFigshare(search_for).then((data) => {
        const l2ArticlePromises = map(data, ({ id }) => getL2Article(id));
        Promise.all(l2ArticlePromises).then(l2Articles => (
          res.send(parseL2ArticlePresenters(l2Articles))
        )).catch(err => {
          console.log('Error occured grabbing Figshare L2 articles', err)
          next(err);
        })
      }).catch(err => {
        console.log(strFormat('Error occured searching Figshare w/ search string %s', search_for), err);
        next(err);
      });

    } else {
      console.error(strFormat('Error occured parsing query parameters %s for search', req.query));
      next(new Error('Search query params invalid'));
    }
});

export default router;
