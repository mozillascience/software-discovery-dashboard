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

  it('omits empty fields', () => {
    const source = 'DataONE';
    const query = {
      page: 1,
      fields: {
        keywords: 'biology,mosquito',
        author: '',
        datePublished: '',
      },
    };
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe('/DataONE/search?keywords[]=biology,mosquito&page=1');
  });

  it('omits keywords if empty', () => {
    const source = 'DataONE';
    const query = {
      page: 1,
      fields: {
        author: 'Seuss',
      },
    };
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe('/DataONE/search?author=Seuss&page=1');
  });

});
