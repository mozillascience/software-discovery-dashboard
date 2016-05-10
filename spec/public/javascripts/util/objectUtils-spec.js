import {
  findKey,
  findAllKeys
} from '../../../../public/javascripts/util/objectUtils';

describe('objectUtils unit tests', () => {
  it('returns falsy when finding key of empty object', () => {
    const value = true;
    const obj = {};
    expect(findKey(obj, value)).toBeFalsy();
  });

  it('returns falsy when value not present', () => {
    const value = true;
    const obj = { some: 'val', another: 'val' };
    expect(findKey(obj, value)).toBeFalsy();
  });

  it('returns key associated with boolean value', () => {
    const key = 'hello';
    const value = true;
    const obj = { [key]: value };
    expect(findKey(obj, value)).toBe(key);
  });

  it('returns key associated with string value', () => {
    const key = 'hello';
    const value = 'world';
    const obj = { [key]: value };
    expect(findKey(obj, value)).toBe(key);
  });

  it('returns key associated with value with multiple keys', () => {
    const key = 'hello';
    const value = 'world';
    const obj = { some: 'val', [key]: value, another: 'val' };
    expect(findKey(obj, value)).toBe(key);
  });

  it('returns an empty array when given empty object', () => {
    const value = true;
    const obj = {};
    expect(findAllKeys(obj, value)).toEqual([]);
  });

  it('returns an empty array when value not present', () => {
    const value = true;
    const obj = { some: 'val', another: 'val' };
    expect(findAllKeys(obj, value)).toEqual([]);
  });

  it('returns key associated with value', () => {
    const key = 'hello';
    const value = 'world';
    const obj = { [key]: value };
    expect(findAllKeys(obj, value)).toEqual([key])
  });

  it('returns key associated with value among other values', () => {
    const key = 'hello';
    const value = 'world';
    const obj = { some: 'val', [key]: value, another: 'val' };
    expect(findAllKeys(obj, value)).toEqual([key]);
  });

  it('returns multiple keys with same value', () => {
    const key1 = 'John';
    const key2 = 'Jane';
    const value = 'Doe';
    const obj = { [key1]: value, [key2]: value };
    expect(findAllKeys(obj, value)).toEqual([key1, key2]);
  });

  it('returns multiple keys with same value among other keys', () => {
    const key1 = 'John';
    const key2 = 'Jane';
    const value = 'Doe';
    const obj = { some: 'val', [key1]: value, [key2]: value, another: 'val' };
    expect(findAllKeys(obj, value)).toEqual([key1, key2]);
  });

});