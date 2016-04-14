import { parseJsonLdQueryParams } from './QueryParamParser';
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

export function getGithubResults(parsedRepositories) {
  const results = [];
  for (let i = 0; i < parsedRepositories.length; i++) {
    const doc = parsedRepositories[i];
    if (doc.relatedLink) {
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

    let pageNum = parseInt(req.query.page, 10);
    if (!pageNum || pageNum < 1) {
      pageNum = 1;
    }
    searchDatacite(searchFor, pageNum).then((repos) => {
      let parsedRepositories = parseRepositories(repos.response.docs);
      if (isGithub) {
        parsedRepositories = getGithubResults(parsedRepositories);
      }
      res.send({
        parsedArticles: parsedRepositories,
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
}
