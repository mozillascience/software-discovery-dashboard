import { post, get } from 'request';
import { format as strFormat } from 'util';

const searchUrl = 'http://api.figshare.com/v2/articles/search';
const l2ArticleUrl = 'https://api.figshare.com/v2/articles/%s';

export function searchFigshare(search_for, pageNumber) {
  return new Promise((resolve, reject) => (
    post({
        url: searchUrl,
        qs: { search_for },
        json: true,
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      reject(new Error(strFormat('Unable to perform Figshare search: (%d), "%s"', response.statusCode, response.body.message)));
    })
  ));
}

export function getL2Article(id) {
  return new Promise((resolve, reject) => (
    get({
      url: strFormat(l2ArticleUrl, id),
      json: true
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      reject(new Error(strFormat('Unable to perform Figshare article lookup: (%d), "%s"', response.statusCode, response.body.message)));
    })
  ));
}
