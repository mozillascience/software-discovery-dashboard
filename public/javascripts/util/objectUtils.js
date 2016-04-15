function findKey(obj, value) {
  for (const k in obj) {
    if (obj[k] === value) {
      return k;
    }
  }

  return null;
}

export { findKey };
