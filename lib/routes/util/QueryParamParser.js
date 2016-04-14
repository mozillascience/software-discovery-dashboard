import { pickBy, isEmpty, isString, isArray } from 'lodash';

const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g; // eslint-disable-line max-len

function validateURLString(url) {
  return urlRegExp.test(url) ? url : '';
}

function validateDateString(date) {
  return Date.parse(date) ? date : null;
}

function validateString(str) {
  return isString(str) ? str : '';
}

function validateArray(arr) {
  return (isArray(arr) && !isEmpty(arr)) ? arr : null;
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

export { parseJsonLdQueryParams };
