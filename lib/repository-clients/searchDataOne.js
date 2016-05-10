import { get } from 'request';
import { isString } from 'lodash';
import { format as strFormat } from 'util';

const searchUrl = 'https://search.dataone.org/cn/v2/query/solr/';

const queryParamsDefault = {
  start: 0,
  rows: 10,
  wt: 'json',
};

export default function searchDataOne(searchFor, pageNum, rows, onRequestComplete) {
  const queryParams = Object.assign({}, queryParamsDefault, {
    q: searchFor,
    start: (pageNum - 1) * rows,
    rows,
  });

  get({
    url: searchUrl,
    qs: queryParams,
    json: true,
  }, onRequestComplete);
}
