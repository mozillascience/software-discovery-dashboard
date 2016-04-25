import { normalizeCommaSeparated } from './stringUtils';
import { findKey } from './objectUtils';
import _ from 'lodash';

export const ERRORS = {
  AT_LEAST_ONE_FIELD: 'AT_LEAST_ONE_FIELD',
};

function getQueryParams(fields) {
  const fieldsWithData = _.filter(Object.keys(fields), field => fields[field]);

  return fieldsWithData.map(field => {
    let param = '';

    if (field === 'keywords') {
      param = `keywords[]=${normalizeCommaSeparated(fields.keywords)}`;
    } else {
      param = `${field}=${fields[field]}`;
    }

    return param;
  }).join('&');
}

function getQueryUrl(source, query) {
  if (_.isEmpty(query.fields)) {
    return ERRORS.AT_LEAST_ONE_FIELD;
  }

  const baseUrl = '/';
  const src = `${source}/search?`;
  const params = getQueryParams(query.fields);
  const page = `&page=${query.page || 1}`;

  return baseUrl + src + params + page;
}

function getArrayStringFromRepoQuery(repo, query) {
  // TODO this will change when querying multiple sources is supported
  const sources = `sources:${findKey(repo, true)}`;
  const fieldsWithData =
    _.filter(Object.keys(query.fields), field => query.fields[field]);
  const fields = fieldsWithData.map(a =>
    `${a}:${normalizeCommaSeparated(query.fields[a])}`
  ).join(' ');

  return sources + (fields.length ? ` ${fields}` : '');
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
