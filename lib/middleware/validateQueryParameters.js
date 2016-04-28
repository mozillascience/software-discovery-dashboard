import { pick, isEmpty, isString, isArray, forEach, pickBy, intersection } from 'lodash';

const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g; // eslint-disable-line max-len

export default function validateQueryParamaters(req, res, next) {
  const validReposToSearch = intersection(req.query.repos, ['figshare', 'dataone']);
  if (isEmpty(validReposToSearch)) {
    next(new Error('Repos query param must 1.) not be empty and 2.) must contain supported repository names'));
  }

  const validatedQueryParams = {};

  // validate strings (ISO date)
  const dateQueryStringPairs = pick(req.query, ['dateCreated', 'dateModified', 'datePublished']);
  const validatedDateQueryStringPairs = pickBy(dateQueryStringPairs, (value) => Date.parse(value));
  Object.assign(validatedQueryParams, validatedDateQueryStringPairs);

  // validate string (URL)
  const urlQueryStringPair = pick(req.query, 'codeRepository');
  const validatedUrlQueryStringPair = pickBy(urlQueryStringPair, (value) => urlRegExp.test(urlQueryParamPair.codeRepository));
  Object.assign(validatedQueryParams, validatedUrlQueryStringPair);

  // validate arrays
  const arrayQueryStringPairs = pick(req.query, ['repos', 'keywords']);
  const validatedArrayQueryStringPairs = pickBy(arrayQueryStringPairs, (value) => isArray(value) && !isEmpty(value));
  Object.assign(validatedQueryParams, validatedArrayQueryStringPairs);

  // validate general strings
  const strQueryStringPairs = pick(req.query,
    ['author', 'identifier', 'description', 'license', 'title', 'version', 'uploadedBy']);

  const validatedStringQueryParamPairs = pickBy(strQueryStringPairs, isString);
  Object.assign(validatedQueryParams, validatedStringQueryParamPairs);

  // validate page number 
  if (isNan(req.query.page) || parseInt(req.query.page, 10) < 1) {
    validatedQueryParams.page = 1;
  } else {
    validatedQueryParams.page = parseInt(req.query.page, 10);
  }

  if (isEmpty(validatedQueryParams)) {
    next(new Error('No query param search criteria found'));
  }

  req.validatedQueryParams = validatedQueryParams;
  next();
}
