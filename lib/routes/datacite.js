/* eslint-disable no-console */

import express from 'express';
import { format as strFormat } from 'util';
import { searchDatacite } from '../repository-clients/datacite-client';
import { parseJsonLdQueryParams } from './util/QueryParamParser';
import { isEmpty, flatMap, flatten } from 'lodash';
import parseRepositories from '../repository-mappers/datacite/parseRepositories';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', (req, res, next) => {
  const jsonLdQuery = parseJsonLdQueryParams(req.query);
  if (!isEmpty(jsonLdQuery)) {
    const searchFor = flatten(flatMap(jsonLdQuery)).join(' ');

    let pageNum = parseInt(req.query.page, 10);
    if (!pageNum || pageNum < 1) {
      pageNum = 1;
    }
    searchDatacite(searchFor, pageNum).then((repos) => {
      res.send({
        parsedArticles: parseRepositories(repos.response.docs),
        responseHeader: {
          currentPage: pageNum,
          lastPage: Math.ceil(repos.response.numFound / 10),
        },
      });
    }).catch(err => {
      console.error('Error occured searching  for "%s"', searchFor, err);
      next(err);
    });
  } else {
    const err = new Error(strFormat('Query parameters %j not valid for ' +
      'datacite search', req.query));
    err.status = 422;
    console.error(err.message);
    next(err);
  }
});

export default router;
