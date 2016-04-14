import { parseJsonLdQueryParams } from 'QueryParamParser';
import { searchDatacite } from '../../repository-clients/datacite-client';
import { format as strFormat } from 'util';
import parseRepositories from '../../repository-mappers/datacite/parseRepositories';
import { isEmpty, flatMap, flatten } from 'lodash';

function checkListForGithub(list) {
  for (let i = 0; i < list.length; i++) {
    const string = list[i];
    if (string.toLowerCase().indexOf('github') >= 0) {
      return true;
    }
  }
  return false;
}

function getGithubResults(parsedRepositories) {
  const results = [];
  for (let i = 0; i < parsedRepositories.length; i++) {
    const doc = parsedRepositories[i];
    if (doc.relatedLink) {
      console.log(checkListForGithub(doc.relatedLink));
      if (checkListForGithub(doc.relatedLink)) {
        results.push(doc);
      }
    }
  }
  return results;
}

export function dataciteHelper(req, res, next, isGithub) {
  const jsonLdQuery = parseJsonLdQueryParams(req.query);
  if (!isEmpty(jsonLdQuery)) {
    const searchFor = flatten(flatMap(jsonLdQuery)).join(' ');
    searchDatacite(searchFor).then((repos) => {
      const parsedRepositories = parseRepositories(repos.response.docs);
      if (isGithub) {
        res.send(getGithubResults(parsedRepositories));
      } else {
        res.send(parsedRepositories);
      }
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
}
