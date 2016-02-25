import { flatten, flatMap } from 'lodash';

export function parseJsonLdToFigshareQueryParams(jsonLdProperties) {
  return {
    has_title: jsonLdProperties.title,
    has_tag: jsonLdProperties.keywords,
    has_author: jsonLdProperties.author,
    search_for: flatten(flatMap(jsonLdProperties)).join(' '),
  };
}
