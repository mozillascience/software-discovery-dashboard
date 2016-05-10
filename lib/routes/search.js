import { format as strFormat } from 'util';
import { flatMap, flatten, includes } from 'lodash';

export default function search(repositoryName, searchStrategy, parseRepositoryStrategy) {
  return (req, res, next) => {
    if (includes(req.query.repos, repositoryName)) {
      const searchFor = flatten(flatMap(req.searchFor)).join(' ');

      // compute number of rows per page
      let rows;
      switch (req.query.repos.length) {
        case 1:
          rows = 15;
          break;
        case 2:
          rows = 7;
          break;
        case 3:
          rows = 5;
          break;
        default:
          rows = 15;
          break;
      }

      searchStrategy(searchFor, req.page, rows, (err, response, body) => {
        if (response.statusCode === 200) {
          if (req.articlesToSend) {
            req.articlesToSend = req.articlesToSend
              .concat(parseRepositoryStrategy(body.response.docs));
          } else {
            req.articlesToSend = parseRepositoryStrategy(body.response.docs);
          }
          if (!req.lastPage || req.lastPage < Math.ceil(body.response.numFound / rows)) {
            req.lastPage = Math.ceil(body.response.numFound / rows);
          }
          next();
        } else if (err) {
          /* eslint-disable no-console */
          console.err('Error occured requesting search for %s repository',
            repositoryName,
            err);
          throw err;
        } else {
          const errMsg = strFormat('%s repository could not return search results (status code %d)',
            repositoryName);
          console.err(errMsg);
          /* eslint-enable no-console */
          throw new Error(errMsg);
        }
      });
    } else {
      next();
    }
  };
}
