import {get} from 'request';
import {format as strFormat} from 'util';

const searchUrl = 'http://search.datacite.org/api?wt=json&q=';

export function searchDatacite(q) {
  return new Promise((resolve, reject) => (
    get({
      url: strFormat(searchUrl, q),
      json: true
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      reject(new Error(strFormat('Unable to perform Datacite search: (%d), "%s"',
        response.statusCode, response.body.message)));
    })
  ));
}