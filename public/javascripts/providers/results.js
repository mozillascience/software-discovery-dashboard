import { normalizeCommaSeparated } from '../util/stringUtils';

function getQueryParams(query) {
  return Object.keys(query).map(attr => {
    let param = '';

    if (attr === 'keywords') {
      param = 'keywords[]=' + normalizeCommaSeparated(query.keywords);
    } else {
      param = attr + '=' + query[attr];
    }

    return param;
  }).join('&');
}

function getQueryUrl(source, query) {
  const baseUrl = '/';
  const src = source + '/search?';
  const params = getQueryParams(query);

  return baseUrl + src + params;
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
