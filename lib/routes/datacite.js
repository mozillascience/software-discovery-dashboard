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
    searchDatacite(searchFor).then((repos) => {
      const parsedRepositories = parseRepositories(repos.response.docs);
      res.send(parsedRepositories);
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
