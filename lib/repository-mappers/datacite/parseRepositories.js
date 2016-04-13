import { map } from 'lodash';

function parseRepository(repo) {
  return {
    identifier: repo.identifier,
    datePublished: repo.publicationyear,
    title: repo.title,
  }
}

export default function parseRepositories(repos) {
  return map(repos, parseRepository);
}
