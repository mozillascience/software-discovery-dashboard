import { map } from 'lodash';

function parseRepository(repo) {
  return {
    author: repo.creatorName,
    identifier: repo.identifier,
    // codeRepository:
    datePublished: repo.publicationYear,
    dateModified: repo.updated,
    dateCreated: repo.created,
    description: repo.description,
    keywords: repo.subject,
    license: repo.rights,
    title: repo.title,
    version: repo.version
  }
}

export default function parseRepositories(repos) {
  return map(repos, parseRepository);
}
