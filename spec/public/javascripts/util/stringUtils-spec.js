import {
  normalizeCommaSeparated
} from '../../../../public/javascripts/util/stringUtils';

describe('stringUtils unit tests', () => {
  it('returns an empty string on empty input', () => {
    const str = '';
    expect(normalizeCommaSeparated(str)).toBe('');
  });

  it('returns unchanged input on a single word', () => {
    const str = 'hello';
    expect(normalizeCommaSeparated(str)).toBe(str);
  });

  it('returns unchanged input on comma separated string with no spaces', () => {
    const str = 'hello,world';
    expect(normalizeCommaSeparated(str)).toBe(str);
  });

  it('replaces spaces in between words with a comma', () => {
    const str = 'hello world';
    expect(normalizeCommaSeparated(str)).toBe('hello,world');
  });

  it('replaces a variable number of spaces with a single comma', () => {
    const str = 'hello    world';
    expect(normalizeCommaSeparated(str)).toBe('hello,world');
  });

  it('ignores leading and trailing whitespace', () => {
    const str = '        hello,world    ';
    expect(normalizeCommaSeparated(str)).toBe('hello,world');
  });

  it('replaces unnecessarily repeated commas with a single comma', () => {
    const str = 'hello,,,,world';
    expect(normalizeCommaSeparated(str)).toBe('hello,world');
  });

  it('replaces typical comma-space pairs with a single comma', () => {
    const str = 'hello, world';
    expect(normalizeCommaSeparated(str)).toBe('hello,world');
  });
});
