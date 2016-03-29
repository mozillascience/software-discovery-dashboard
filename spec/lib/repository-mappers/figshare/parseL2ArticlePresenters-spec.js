import parseL2ArticlePresenter  from '../../../../lib/repository-mappers/figshare/parseL2ArticlePresenter'

describe('Fighshare L2 Article Presentor Parser Suite', () => {
  const figshareArticle = require('./resources/figshareArticle.json')
  const convertedArticle = parseL2ArticlePresenter(figshareArticle)

  it('converts Figshare article DOI to codemeta identifier', () =>
    expect(convertedArticle.identifier).toBe(figshareArticle.doi)
  )

  it('converts Figshare article published date to codemeta date published', () =>
    expect(convertedArticle.published_date).toBe(figshareArticle.datePublished)
  )

  it('converts Figshare article date modified to codemeta identifier', () =>
    expect(convertedArticle.dateModified).toBe(figshareArticle.modified_date)
  )

  it('converts Figshare article date created to codemeta created date', () =>
    expect(convertedArticle.dateCreated).toBe(figshareArticle.created_date)
  )

  it('converts Figshare description to codemeta description', () =>
    expect(convertedArticle.description).toBe(figshareArticle.description)
  )

  it('converts Figshare tags to codemeta keys', () =>
    expect(convertedArticle.keywords).toBe(figshareArticle.tags)
  )

  it('converts Figshare license to codemeta license', () =>
    expect(convertedArticle.license).toBe(figshareArticle.license.url)
  )

  it('converts Figshare title to codemeta title', () =>
    expect(convertedArticle.title).toBe(figshareArticle.title)
  )

  it('converts Figshare version to codemeta version', () =>
    expect(convertedArticle.version).toBe(figshareArticle.version)
  )

  it('converts Figshare authors to codemeta authors', () => {
    expect(convertedArticle.author.length).toBe(1);
    expect(convertedArticle.author[0].name).toBe(figshareArticle.authors[0].full_name);
    expect(convertedArticle.author[0]['@id']).toBe('http://orcid.org/0000-0002-4106-2545');
  })

})
