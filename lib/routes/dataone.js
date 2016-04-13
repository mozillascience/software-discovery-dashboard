import express from 'express';
import { flatten, flatMap, isEmpty } from 'lodash';
import { format as strFormat } from 'util';
import { parseJsonLdQueryParams } from './util/QueryParamParser';
import searchDataOne from '../repository-clients/dataone-client';
import parseSearchedArticles from '../repository-mappers/dataone/parseSearchedArticles';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', (req, res, next) => {
  const jsonLdQuery = parseJsonLdQueryParams(req.query);
  if (isEmpty(jsonLdQuery)) {
    const err = new Error(strFormat('Query parameters %j not valid for DataONE search', req.query));
    err.status = 422;
    console.error(err.message);
    next(err);
  } else {
    const searchQuery = flatten(flatMap(jsonLdQuery)).join(' ');
    searchDataOne(searchQuery, parseInt(req.query.page, 10)).then((fullResponse) => {
      const parsedArticles = parseSearchedArticles(fullResponse.response.docs);
      res.send(parsedArticles);
    }).catch(err => {
      console.error('Error occured retrieving parsed DataONE articles for search query "%s"',
        searchQuery,
        err
      );

      next(err);
    });
  }
});

export default router;
