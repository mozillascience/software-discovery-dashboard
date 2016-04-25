import {
  ERRORS,
  getQueryUrl,
  getArrayStringFromRepoQuery,
  getRepoQueryFromArrayString,
} from '../../../../public/javascripts/util/query';

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

  it('defaults page to 1 if not specified', () => {
    const source = 'DataONE';
    const query = {
      fields: {
        author: 'Seuss',
      },
    };
    const queryUrl = getQueryUrl(source, query);

    expect(queryUrl).toBe('/DataONE/search?author=Seuss&page=1');
  });

  it('returns only repo if no fields specified', () => {
    const repo = { DataONE: true };
    const query = {
      page: 1,
      fields: {},
    };
    const arrayString = getArrayStringFromRepoQuery(repo, query);

    expect(arrayString).toBe('sources:DataONE');
  });

  it('builds a basic array string from repo and query', () => {
    const repo = { DataONE: true };
    const query = {
      page: 1,
      fields: {
        keywords: 'biology,mosquito',
        author: 'Seuss',
      },
    };
    const arrayString = getArrayStringFromRepoQuery(repo, query);

    expect(arrayString).toBe('sources:DataONE keywords:biology,mosquito author:Seuss');
  });

  it('ignores empty fields when building array string', () => {
    const repo = { DataONE: true };
    const query = {
      page: 1,
      fields: {
        keywords: '',
        author: 'Seuss',
        datePublished: '',
      },
    };
    const arrayString = getArrayStringFromRepoQuery(repo, query);

    expect(arrayString).toBe('sources:DataONE author:Seuss');
  });

  it('returns page 1 and empty fields object with only source', () => {
    const arrayString = 'sources:DataONE';
    const query = getRepoQueryFromArrayString(arrayString);

    expect(query).toEqual({
      repo: 'DataONE',
      query: {
        page: 1,
        fields: {},
      },
    });
  });

  it('returns a basic query object', () => {
    const arrayString = 'sources:DataONE author:Seuss';
    const query = getRepoQueryFromArrayString(arrayString);

    expect(query).toEqual({
      repo: 'DataONE',
      query: {
        page: 1,
        fields: { author: 'Seuss' },
      }
    });
  });

});
