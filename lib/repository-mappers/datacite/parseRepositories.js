import { map } from 'lodash';

function parseRepository(doc) {
    return {
        author: doc.creator,
        identifier: doc.identifier,
        datePublished: doc.publicationYear,
        dateModified: doc.updated,
        dateCreated: doc.created,
        description: doc.description,
        keywords: doc.subject,
        license: doc.rights,
        title: doc.title,
        version: doc.version,
        relatedLink: doc.relatedIdentifier
    }
}

export default function parseRepositories(docs) {
    return map(docs, parseRepository);
}
