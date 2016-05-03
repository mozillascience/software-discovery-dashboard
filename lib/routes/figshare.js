/* eslint-disable no-console */

import express from 'express';
import { format as strFormat } from 'util';
import { isEmpty, flatMap, flatten } from 'lodash';
import { searchDatacite } from '../repository-clients/datacite-client';
import parseL2ArticlePresenter from '../repository-mappers/figshare/parseL2ArticlePresenter';
import parseRepositories from '../repository-mappers/datacite/parseRepositories';
import { parseJsonLdQueryParams } from './util/QueryParamParser';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', (req, res, next) => {
  const jsonLdQuery = req.validatedQueryParams;
  if (!isEmpty(jsonLdQuery)) {
    const searchFor = flatten(flatMap(jsonLdQuery)).join(' ');

    let pageNum = parseInt(req.query.page, 10);
    if (!pageNum || pageNum < 1) pageNum = 1;

    searchDatacite(searchFor, ['publisher:Figshare'], pageNum).then((repos) => {
      res.send({
        parsedArticles: parseRepositories(repos.response.docs),
        responseHeader: {
          currentPage: pageNum,
          lastPage: Math.ceil(repos.response.numFound / 10),
        },
      });
    }).catch(err => {
      console.error('Error occured searching for "%s"', searchFor, err);
      next(err);
    });
  } else {
    const err = new Error(strFormat('Query parameters %j not valid for ' +
      'Figshare search', req.query));
    err.status = 422;
    console.error(err.message);
    next(err);
  }
});

router.get('/article/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (id && Number.isInteger(id) && id > 0) {
    getL2Article(id).then((article) => {
      const parsedArticle = parseL2ArticlePresenter(article);
      res.send(parsedArticle);
    }).catch(err => {
      console.error('Error occured performing Figshare article lookup for ID %d', id, err);
      next(err);
    });
  } else {
    const errMsg = strFormat('Figshare ID URL param %s is not valid for figshare lookup',
      req.params.id);
    const err = new Error(errMsg);
    err.status = 422;
    console.error(err.message);
    next(err);
  }
});

export default router;
