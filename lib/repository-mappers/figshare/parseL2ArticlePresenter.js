import { format as strFormat } from 'util';
import { map } from 'lodash';

function parseAuthorPresenter({ full_name, orcid_id }) {
  const jsonLdAuthor = { '@type': 'Person', name: full_name };
  if (orcid_id) jsonLdAuthor['@id'] = strFormat('http://orcid.org/%s', orcid_id);
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
    version: article.version
    // uploadedBy:
  };
}
