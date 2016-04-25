// ' this is an, input,    string   ' => 'this,is,an,input,string'
function normalizeCommaSeparated(str) {
  return str
    .trim()
    .replace(/,/g, ' ')
    .replace(/\s+/g, ',');
}

export { normalizeCommaSeparated };
