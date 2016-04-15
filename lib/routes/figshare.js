import express from 'express';
import { format as strFormat } from 'util';
import { isEmpty, flatMap, flatten } from 'lodash';
import { searchFigshare, getL2Article } from '../repository-clients/figshare-client';
import parseL2ArticlePresenter from '../repository-mappers/figshare/parseL2ArticlePresenter';
import parseL1ArticlePresenters from '../repository-mappers/figshare/parseL1ArticlePresenters';
import { parseJsonLdQueryParams } from './util/QueryParamParser';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', (req, res, next) => {
  const jsonLdQuery = parseJsonLdQueryParams(req.query);
  if (!isEmpty(jsonLdQuery)) {
    const searchFor = flatten(flatMap(jsonLdQuery)).join(' ');
    let pageNum = parseInt(req.query.page, 10);
    if (!pageNum || pageNum < 1) {
      pageNum = 1;
    }
    searchFigshare(searchFor, pageNum).then((articles) => {
      res.send({
        parsedArticles: parseL1ArticlePresenters(articles),
        responseHeader: {
          currentPage: pageNum,
          lastPage: 100,
        },
      });
    }).catch(err => {
      console.error('Error occured searching Figshare for "%s"', searchFor, err);
      next(err);
    });
  } else {
    const errMsg = strFormat('Query parameters %j not valid for figshare search',
      req.query);
    const err = new Error(errMsg);
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
