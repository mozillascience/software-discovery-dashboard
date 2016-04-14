import express from 'express';
import { searchDatacite } from '../repository-clients/datacite-client';
import { parseJsonLdQueryParams } from './util/QueryParamParser';
import { isEmpty, flatMap, flatten } from 'lodash';
import { parseRepositories } from '../repository-mappers/datacite/parseRepositories';


const router = express.Router();

router.get('/search', (req, res, next) => {
    //const q = "hydrogen";
    const jsonLdQuery = parseJsonLdQueryParams(req.query);
    if (!isEmpty(jsonLdQuery)){
        const search_for = flatten(flatMap(jsonLdQuery)).join(' ');
        searchDatacite(search_for).then((repos) => {
          const parsedRepositories = parseRepositories(repos);
          res.send(parsedRepositories);
        }).catch(err => {
        console.error('Error occured searching  for "%s"', search_for, err);
          next(err);
        });
    }
  else {
    const err = new Error(strFormat('Query parameters %j not valid for datacite search', req.query));
    err.status = 422;
    console.error(err.message);
    next(err);
  }
});

export default router;