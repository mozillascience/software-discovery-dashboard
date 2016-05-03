import { includes } from 'lodash';

export default function validateRepoIsRequested(repo) {
  return function validateRepoIsRequested(req, res, next) {
    console.log(req.validateQueryParameters);
    if (includes(req.query.repos, repo)) {
      req.currentRepoToSearch = repo;
    } else {
      next();
    }
  }
}
