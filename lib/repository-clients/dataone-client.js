import { get } from 'request';
import { isString } from 'lodash';
import { format as strFormat } from 'util';

const searchUrl = 'https://search.dataone.org/cn/v2/query/solr/';

const queryParamsTemplate = {
  q: '-obsoletedBy:* %s formatType:METADATA',
  facet: 'true',
  fl: 'id,keywords,title,origin,pubDate,dateUploaded,abstract',
  'facet.mincount': '1',
  'facet.sort': 'index',
  start: '%s',
  'facet.limit': '-1',
  wt: 'json',
  rows: '10',
};

export default function searchDataOne(searchCriteria, pageNum) {
  return new Promise((resolve, reject) => {
    if (!isString(searchCriteria) || !searchCriteria) {
      reject(new Error('Unable to search DataONE: search query "%s" invalid', searchCriteria));
    }

    const queryParams = Object.assign({},
      queryParamsTemplate,
      {
        q: strFormat(queryParamsTemplate.q, searchCriteria),
        start: pageNum >= 1 ? (pageNum - 1) * 10 : 0,
      }
    );

    get({
      url: searchUrl,
      qs: queryParams,
      json: true,
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      reject(new Error(strFormat('Unable to perform DataOne article lookup: (%d), "%s"',
        response.statusCode,
        response.body.message
      )));
    });
  });
}
