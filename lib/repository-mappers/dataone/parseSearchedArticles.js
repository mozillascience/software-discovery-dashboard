import { map } from 'lodash';

function parseSearchedArticle(article) {
  return {
    id: article.id,
    keywords: article.keywords,
    title: article.title,
    author: article.origin,
    datePublished: article.pubDate,
    dateCreated: article.dateUploaded,
    description: article.abstract,
    source: article.id,
  };
}

export default function parseSearchedArticles(articles) {
  return map(articles, parseSearchedArticle);
}
