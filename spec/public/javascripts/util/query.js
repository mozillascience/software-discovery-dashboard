import { getQueryUrl } from '../../../../public/javascripts/util/query';

describe('query util unit tests', () => {
  it('builds a basic query url', () => {
    const source = 'DataONE';
    const query = {
      page: 1,
      fields: {
        keywords: ['biology'],
      },
    };
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe('/DataONE/search?keywords[]=biology&page=1');
  });
});
