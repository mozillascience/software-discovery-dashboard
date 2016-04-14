import { getGithubResults }  from '../../../../lib/routes/util/dataciteHelper';
import parseRepositories  from '../../../../lib/repository-mappers/datacite/parseRepositories';


const dataciteDocs = require('../../repository-mappers/datacite/resources/dataciteDocs.json');
const parsedDataciteDocs = parseRepositories(dataciteDocs);

describe('Github with datacite unit tests', () => {
  it('finds one github document', () => {
    const parsedRepo = getGithubResults(parsedDataciteDocs);
    expect(parsedRepo.length).toBe(1);
  });

  it('The related link is a github link', () => {
    const parsedRepo = getGithubResults(parsedDataciteDocs);
    const string = parsedRepo[0].relatedLink[0];
    expect(string.indexOf('github')).not.toBe(-1);
  });

});
