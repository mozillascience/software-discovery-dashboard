import parseRepositories  from '../../../../lib/repository-mappers/datacite/parseRepositories';


const dataciteDoc = require('./resources/dataciteDoc.json');
const dataciteDocs = require('./resources/dataciteDocs.json');

const parsedDataciteDocs = parseRepositories(dataciteDocs);

describe('Datacite unit tests', () => {
    it('parses one datacite article', () => {
        const parsedRepo = parseRepositories(dataciteDoc);
        expect(parsedRepo.length).toBe(1);
    });

    it('parses two datacite articles', () => {
        expect(parsedDataciteDocs.length).toBe(2);
    });

    it('correctly maps the title of the datacite metadata to the jsonLD', () => {
        expect(parsedDataciteDocs[0].title).toBe(dataciteDocs[0].title);
        expect(parsedDataciteDocs[1].title).toBe(dataciteDocs[1].title);
    });
});