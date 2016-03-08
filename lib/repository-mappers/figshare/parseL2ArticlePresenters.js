import { map } from 'lodash';
import { parseAuthorPresenters } from './parseAuthorPresenters';

function parseL2Article(article) {
  return {
    author: parseAuthorPresenters(article.authors),
    identifier: article.doi,
    // codeRepository:
    datePublished: article.published_date,
    dateModified: article.modified_date,
    dateCreated: article.created_date,
    description: article.description,
    keywords: article.tags,
    license: article.license ? article.license.url : undefined,
    title: article.title,
    version: article.version
    //uploadedBy:
  };
}

export function parseL2ArticlePresenters(articles) {
  return map(articles, parseL2Article);
}
