function normalizeCommaSeparated(str) {
  return str
    .trim()
    .replace(/,/g, ' ')
    .replace(/\s+/g, ',');
}

export { normalizeCommaSeparated };
