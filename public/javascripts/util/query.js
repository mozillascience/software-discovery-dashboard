import { normalizeCommaSeparated } from './stringUtils';
import { findKey } from './objectUtils';

function getQueryParams(fields) {
  return Object.keys(fields).map(attr => {
    let param = '';

    if (attr === 'keywords') {
      param = `keywords[]=${normalizeCommaSeparated(fields.keywords)}`;
    } else {
      param = `${attr}=${fields[attr]}`;
    }

    return param;
  }).join('&');
}

function getQueryUrl(source, query) {
  const baseUrl = '/';
  const src = `${source}/search?`;
  const params = getQueryParams(query.fields);
  const page = `&page=${query.page}`;

  return baseUrl + src + params + page;
}

function getArrayStringFromRepoQuery(repo, query) {
  // TODO this will change when querying multiple sources is supported
  const sources = `sources:${findKey(repo, true)} `;
  const fields = Object.keys(query.fields).map(a =>
    `${a}:${normalizeCommaSeparated(query.fields[a])}`
  ).join(' ');
  return sources + fields;
}

/*
  Precondition: correctly formed query array string from
  getArrayStringFromRepoQuery

  'sources:DataONE keywords:Hello,World' ->
  { repo: 'DataONE', query: { fields: { ... }, page: 1 } }
*/
function getRepoQueryFromArrayString(arrStr) {
  const bySpaces = arrStr.split(' ');
  const src = bySpaces[0].split(':')[1];
  const query = {
    fields: {},
    page: 1,
  };

  bySpaces.slice(1).forEach(field => {
    const split = field.split(':');
    const attr = split[0];
    const value = split[1];

    query.fields[attr] = value;
  });

  return {
    repo: src,
    query,
  };
}

export {
  getQueryUrl,
  getArrayStringFromRepoQuery,
  getRepoQueryFromArrayString,
};
