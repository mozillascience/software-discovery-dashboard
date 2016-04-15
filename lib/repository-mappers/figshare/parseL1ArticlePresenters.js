import { map } from 'lodash';
import { format as strFormat } from 'util';

function parseL1ArticlePresenter(article) {
  return {
    id: article.id,
    identifier: article.doi,
    datePublished: article.published_date,
    title: article.title,
    source: strFormat('https://api.figshare.com/v2/articles/%s', article.id),
  };
}

export default function parseL1ArticlePresenters(articles) {
  return map(articles, parseL1ArticlePresenter);
}
