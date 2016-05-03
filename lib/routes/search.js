import express from 'express';
import { format as strFormat } from 'util';
import { isEmpty, flatMap, flatten } from 'lodash';

const router = express.Router(); // eslint-disable-line new-cap

export default function search(searchStrategy, parseRepositoryStrategy) {
  router.get('/search', (req, res, next) => {
    const searchFor = flatten(flatMap(req.validatedQueryParams)).join(' ');

    searchStrategy(searchFor, req.validatedQueryParams.page, function onSearchComplete(err, response, body) {
      if (response.statusCode === 200) {
        res.send(parseRepositoryStrategy(body));
      } else if (err) {
        console.err('Error occured requesting search for %s repository', req.currentRepoToSearch, err);
        throw err;
      } else {
        console.log(JSON.stringify(response));
        const errMsg = strFormat('%s repository could not return search results (status code %d)', req.currentRepoToSearch);
        console.err(errMsg);
        throw new Error(errMsg);
      }
    });
  });

  return router;
}
