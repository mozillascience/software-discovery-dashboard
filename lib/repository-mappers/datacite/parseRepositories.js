import { map } from 'lodash';

function parseRepository(doc) {
    console.log(doc.title);
    return {
        author: doc.creator,
        identifier: doc.identifier,
        // codedocsitory:
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

export default function parseRepositories(repos) {
    const docs = repos.response.docs;
    return map(docs, parseRepository);
}
