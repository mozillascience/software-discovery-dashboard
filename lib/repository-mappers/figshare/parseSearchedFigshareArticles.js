/* eslint arrow-body-style: "off" */

import { map } from 'lodash';
import { format as strFormat } from 'util';

export default function parseSearchedFigshareArticles(articles) {
  return map(articles, article => {
    return {
      id: article.id,
      identifier: article.doi,
      datePublished: article.published_date,
      title: article.title,
      source: strFormat('https://api.figshare.com/v2/articles/%d', article.id),
    };
  });
}
