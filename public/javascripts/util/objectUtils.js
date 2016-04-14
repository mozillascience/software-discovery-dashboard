function findKey(obj, value, strict = true) {
  for (var k in obj)
    if (strict ? obj[k] === value : obj[k] == value)
      return k;
  return null;
}

export { findKey };
