import { get } from 'request';
import { format as strFormat } from 'util';

const searchUrl = 'http://search.datacite.org/api';
const softwareFilterQuery = 'resourceTypeGeneral:Software';

export function searchDatacite(query, filterQuery, pageNum) {
  return new Promise((resolve, reject) => (
    get({
      url: searchUrl,
      useQuerystring: true,
      json: true,
      qs: {
        q: query,
        fq: filterQuery.concat([softwareFilterQuery]),
        start: pageNum >= 1 ? (pageNum - 1) * 10 : 0,
        wt: 'json',
      },
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      reject(new Error(strFormat('Unable to perform Datacite search: (%d), "%s"',
        response.statusCode, response.body.message)));
    })
  ));
}
