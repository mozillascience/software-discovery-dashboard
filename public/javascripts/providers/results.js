import { normalizeCommaSeparated } from '../util/stringUtils';

function getQueryParams(fields) {
  return Object.keys(fields).map(attr => {
    let param = '';

    if (attr === 'keywords') {
      param = 'keywords[]=' + normalizeCommaSeparated(fields.keywords);
    } else {
      param = attr + '=' + fields[attr];
    }

    return param;
  }).join('&');
}

function getQueryUrl(source, query) {
  const baseUrl = '/';
  const src = source + '/search?';
  const params = getQueryParams(query.fields);
  const page = '&page=' + query.page;

  return baseUrl + src + params + page;
}

export function queryForResults(source, query, callback) {
  const url = getQueryUrl(source, query);

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(JSON.parse(xmlHttp.responseText));
    }
  };
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}
