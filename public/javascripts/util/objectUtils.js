function findKey(obj, value) {
  for (const k in obj) {
    if (obj[k] === value) {
      return k;
    }
  }

  return null;
}

function findAllKeys(obj, value) {
  const keys = [];

  for (const k in obj) {
    if (obj[k] === value) {
      keys.push(k);
    }
  }

  return keys;
}

export { findKey, findAllKeys };
