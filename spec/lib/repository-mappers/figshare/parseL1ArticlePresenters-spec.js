import parseL1ArticlePresenters  from '../../../../lib/repository-mappers/figshare/parseL1ArticlePresenters';

const figshareL1Articles = require('./resources/figshareL1Articles.json');
const convertedArticles = parseL1ArticlePresenters(figshareL1Articles);

it('parses all articles figshare returns', () =>
  expect(convertedArticles.length).toBe(2)
);

it('converts Figshare article DOIs to codemeta identifier', () => {
  expect(convertedArticles[0].identifier).toBe(figshareL1Articles[0].doi);
  expect(convertedArticles[1].identifier).toBe(figshareL1Articles[1].doi);
});

it('converts Figshare article titles to codemeta titles', () => {
  expect(convertedArticles[0].title).toBe(convertedArticles[0].title);
  expect(convertedArticles[1].title).toBe(convertedArticles[1].title);
});

it('converts Figshare article published date to codemeta date published', () => {
  expect(convertedArticles[0].datePublished).toBe(figshareL1Articles[0].published_date);
  expect(convertedArticles[1].datePublished).toBe(figshareL1Articles[1].published_date);
});
