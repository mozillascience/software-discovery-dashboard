import { format as strFormat } from 'util';
import { map } from 'lodash';

function parseAuthorPresenter({ full_name, orcidId }) {
  const jsonLdAuthor = { '@type': 'Person', name: full_name };
  if (orcidId) jsonLdAuthor['@id'] = strFormat('http://orcid.org/%s', orcidId);
  return jsonLdAuthor;
}

export default function parseL2ArticlePresenter(article) {
  return {
    author: map(article.authors, parseAuthorPresenter),
    identifier: article.doi,
    // codeRepository:
    datePublished: article.published_date,
    dateModified: article.modified_date,
    dateCreated: article.created_date,
    description: article.description,
    keywords: article.tags,
    license: article.license.url,
    title: article.title,
    version: article.version,
    // uploadedBy:
  };
}
