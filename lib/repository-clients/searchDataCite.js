import { get } from 'request';
import { format as strFormat } from 'util';

const searchUrl = 'http://search.datacite.org/api';

const queryParamsDefaults = {
  start: 0,
  rows: 10,
  fq: ['resourceTypeGeneral: Software'],
  wt: 'json',
};

export default function searchDatacite(searchFor, publisher, pageNum, rows, onRequestComplete) {
  const queryParams = Object.assign({}, queryParamsDefaults, {
      q: searchFor,
      start: (pageNum - 1) * rows,
      fq: queryParamsDefaults.fq.concat(strFormat('publisher: %s', publisher)),
      rows
  });

  get({
    url: searchUrl,
    json: true,
    qs: queryParams,
    useQuerystring: true,
  }, onRequestComplete);
}
