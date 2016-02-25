import { get } from 'request';
import { getFigshareAuth } from '../repository-auth/auth-store';

const searchUrl = 'http://api.figshare.com/v1/articles/search';

export function searchFigshare({ has_title, has_tag, has_author, search_for }) {
  return new Promise((resolve, reject) => (
    getFigshareAuth().then(auth => {
      get({
          url: searchUrl,
          qs: { has_title, has_tag, has_author, search_for },
          oauth: auth,
          json: true,
        }, (error, response, body) => (
          !error && response.statusCode === 200 ? resolve(body) : reject(error)
        ))
      }).catch(err => {
        console.log('Error occured retrieving Figshare auth', err);
        throw err
      })
  ));
}
