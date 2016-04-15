import { map } from 'lodash';
import { format as strFormat } from 'util';

function parseRepository(doc) {
  return {
    author: doc.creator,
    identifier: doc.doi,
    datePublished: doc.publicationYear,
    dateModified: doc.updated,
    dateCreated: doc.created,
    description: doc.description,
    keywords: doc.subject,
    license: doc.rights,
    title: doc.title,
    version: doc.version,
    relatedLink: doc.relatedIdentifier,
    id: doc.nameIdentifier,
    source: strFormat('http://data.datacite.org/%s', doc.doi),
  };
}

export default function parseRepositories(docs) {
  return map(docs, parseRepository);
}
