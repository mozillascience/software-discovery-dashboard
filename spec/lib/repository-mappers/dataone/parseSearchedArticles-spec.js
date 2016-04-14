import parseSearchedArticles  from '../../../../lib/repository-mappers/dataone/parseSearchedArticles';

const dataoneArticles = require('./resources/dataoneArticles.json');
const convertedArticles = parseSearchedArticles(dataoneArticles);

it('parses all articles dataone returns', () => {
  expect(convertedArticles.length).toBe(3);
});

it('preserves dataone article IDs', () => {
  expect(convertedArticles[0].id).toBe(convertedArticles[0].id);
});

it('converts dataone dateUploaded to dateCreated', () => {
  expect(convertedArticles[0].dateUploaded).toBe(convertedArticles[0].dateCreated);
});

it('preserves dataone keyword attribute', () => {
  expect(convertedArticles[0].keywords).toBe(convertedArticles[0].keywords);
});

it('preserves dataone title attribute', () => {
  expect(convertedArticles[0].title).toBe(convertedArticles[0].title);
});

it('converts dataone pubDate to datePublished', () => {
  expect(convertedArticles[0].pubDate).toBe(convertedArticles[0].datePublished);
});

it('converts dataone abstract to description', () => {
  expect(convertedArticles[0].abstract).toBe(convertedArticles[0].description);
});
