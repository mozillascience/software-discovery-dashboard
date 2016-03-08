import { post, get } from 'request';
import { format as strFormat } from 'util';
import { getFigshareAuth } from '../repository-auth/auth-store';

const searchUrl = 'http://api.figshare.com/v2/articles/search';
const l2ArticleUrl = 'https://api.figshare.com/v2/articles/%s';

export function searchFigshare(search_for, pageNumber) {
  return new Promise((resolve, reject) => (
    post({
        url: searchUrl,
        qs: { search_for },
        json: true,
    }, (error, response, body) => (
      !error && response.statusCode === 200 ? resolve(body) : reject(error)
    ))
  ));
}

export function getL2Article(id) {
  return new Promise((resolve, reject) => (
    get({
      url: strFormat(l2ArticleUrl, id),
      json: true
    }, (error, response, body) => (
      !error && response.statusCode === 200 ? resolve(body) : reject(error)
    ))
  ));
}
