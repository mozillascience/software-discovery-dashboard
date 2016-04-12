import { post, get } from 'request';
import { format as strFormat } from 'util';

const searchUrl = 'http://api.figshare.com/v2/articles/search';
const l2ArticleUrl = 'https://api.figshare.com/v2/articles/%s';

export function searchFigshare(search_for, page) {
  page = page || 1;
  return new Promise((resolve, reject) => (
    post({
        url: searchUrl,
        body: { search_for, page },
        json: true,
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      const errMsg = strFormat('Unable to perform Figshare search: (%d), "%s"',
        response.statusCode, response.body.message);
      reject(new Error(errMsg));
    })
  ));
}

export function getL2Article(id) {
  return new Promise((resolve, reject) => (
    get({
      url: strFormat(l2ArticleUrl, id),
      json: true,
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      const errMsg = strFormat('Unable to perform Figshare article lookup: (%d), "%s"',
        response.statusCode, response.body.message);
      reject(new Error(errMsg));
    })
  ));
}
