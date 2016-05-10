import express from 'express';
import { format as strFormat } from 'util';
import { flatMap, flatten, includes } from 'lodash';

const router = express.Router(); // eslint-disable-line new-cap

export default function search(repositoryName, searchStrategy, parseRepositoryStrategy) {
  return (req, res, next) => {
    if (includes(req.query.repos, repositoryName)) {
      const searchFor = flatten(flatMap(req.searchFor)).join(' ');

      // compute number of rows per page
      let rows = 15;
      switch(req.query.repos.length) {
        case 2:
          rows = 7;
          break;
        case 3:
          rows = 5;
          break;
      }

      searchStrategy(searchFor, req.page, rows, function onSearchComplete(err, response, body) {
        if (response.statusCode === 200) {
          if (req.articlesToSend) {
            req.articlesToSend = req.articlesToSend.concat(parseRepositoryStrategy(body.response.docs));
          } else {
            req.articlesToSend = parseRepositoryStrategy(body.response.docs);
          }
          if (!req.lastPage || req.lastPage < Math.ceil(body.response.numFound / rows)) {
            req.lastPage = Math.ceil(body.response.numFound / rows);
          }
          next();
        } else if (err) {
          console.err('Error occured requesting search for %s repository', repositoryName, err);
          throw err;
        } else {
          console.log(JSON.stringify(response));
          const errMsg = strFormat('%s repository could not return search results (status code %d)', repositoryName);
          console.err(errMsg);
          throw new Error(errMsg);
        }
      });
    } else {
      next();
    }
  };
}
