import { findKey } from '../../../../public/javascripts/util/objectUtils';

describe('objectUtils unit tests', () => {
  it('returns null given an empty object', () => {
    const obj = {};
    const value = true;

    expect(findKey(obj, value)).toBe(null);
  });

  it('returns key with matching boolean value', () => {
    const key = 'hello';
    const value = true;
    const obj = { [key]: value };

    expect(findKey(obj, value)).toBe(key);
  });

  it('returns key with matching integer value', () => {
    const key = 'hello';
    const value = 1;
    const obj = { [key]: value };

    expect(findKey(obj, value)).toBe(key);
  });

  it('returns key with matching string value', () => {
    const key = 'hello';
    const value = 'world';
    const obj = { [key]: value };

    expect(findKey(obj, value)).toBe(key);
  });

  it('returns key with matching value with multiple matches', () => {
    const key1 = 'Jane';
    const key2 = 'Joe';
    const value = 'Smith';
    const obj = { [key1]: value, [key2]: value };

    // is traversal order guaranteed? use regex to be safe
    expect(findKey(obj, value)).toMatch(RegExp(`${key1}|${key2}`));
  });
});
