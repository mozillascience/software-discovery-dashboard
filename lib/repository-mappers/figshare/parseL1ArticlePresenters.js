import { map } from 'lodash';

function parseL1ArticlePresenter(article) {
  return {
    identifier: article.doi,
    datePublished: article.published_date,
    title: article.title,
  };
}

export default function parseL1ArticlePresenters(articles) {
  return map(articles, parseL1ArticlePresenter);
}
