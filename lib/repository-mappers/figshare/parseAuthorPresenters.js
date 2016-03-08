import { map } from 'lodash';

function parseAuthorPresenter(author) {
  // make an issue about ORCID being in figshare public api
  return {
    '@type': 'Person',
    name: author.full_name
  }
}

export function parseAuthorPresenters(figshareAuthors) {
  return map(figshareAuthors, parseAuthorPresenter);
}
