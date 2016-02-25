import { pickBy, isEmpty, isString, isArray } from 'lodash';

const validRepos = [ 'figshare' ];
const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;

function validateURLString(url) {
  if (urlRegExp.test(url)) return url;
}

function validateDateString(date) {
  if (Date.parse(date)) return date;
}

function validateString(str) {
  if (isString(str)) return str;
}

function validateArray(arr) {
  if (isArray(arr) && arr) return arr;
}

function isRepoQueryParamValid(repo) {
  if (isString(repo) && repo && validRepos.indexOf(repo) !== -1) return true;
  return false
}

function parseJsonLdQueryParams({ author, identifier, codeRepository,
  dateCreated, dateModified, datePublished, description, keywords, license,
  title, version, uploadedBy }) {

  // Validate search parameters, filter invalid properties
  const jsonLdFields = pickBy({
    author: validateString(author),
    identifier: validateString(identifier),
    description: validateString(description),
    license: validateString(license),
    title: validateString(title),
    version: validateString(version),
    uploadedBy: validateString(uploadedBy),

    codeRepository: validateURLString(codeRepository),

    dateCreated: validateDateString(dateCreated),
    dateModified: validateDateString(dateModified),
    datePublished: validateDateString(datePublished),

    keywords: validateArray(keywords),
  }, (val) => val);

  return jsonLdFields;
}

export { isRepoQueryParamValid, parseJsonLdQueryParams };
