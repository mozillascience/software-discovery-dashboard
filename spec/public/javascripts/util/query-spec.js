import { ERRORS, getQueryUrl } from '../../../../public/javascripts/util/query';

describe('query util unit tests', () => {
  it('returns AT_LEAST_ONE_FIELD error on empty query', () => {
    const source = 'DataONE';
    const query = {};
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe(ERRORS.AT_LEAST_ONE_FIELD);
  });

  it('builds a basic query url', () => {
    const source = 'DataONE';
    const query = {
      page: 1,
      fields: {
        keywords: 'biology',
      },
    };
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe('/DataONE/search?keywords[]=biology&page=1');
  });
});
