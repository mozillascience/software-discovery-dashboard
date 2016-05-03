import { get } from 'request';
import { format as strFormat } from 'util';

const searchUrl = 'http://search.datacite.org/api';

const queryParamsDefaults = {
  start: 0,
  rows: 10,
  fl: ['resourceTypeGeneral: Software'],
  wt: 'json',
}

export default function searchDatacite(searchFor, publisher, pageNum, onRequestComplete) {
  const queryParams = Object.assign({}, queryParamsDefaults, {
      q: searchFor,
      start: pageNum >= 1 ? (pageNum - 1) * 10 : 0,
      fl: queryParamsDefaults.concact(strFormat('publisher: %s', publisher)),
  });

  get({
    url: searchUrl,
    json: true,
    qs: queryParams
  }, onRequestComplete);
}
