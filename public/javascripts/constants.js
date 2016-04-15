const ATTRIBUTES_DISPLAY = {
  author: 'Author',
  id: 'Identifier',
  datePublished: 'Date Published',
  dateModified: 'Date Modified',
  dateCreated: 'Date Created',
  description: 'Description',
  keywords: 'Keywords',
  license: 'License',
  title: 'Title',
  version: 'Version',
};

const ATTRIBUTES = Object.keys(ATTRIBUTES_DISPLAY);

const DATE_ATTR_DISPLAY = {
  dateCreated: 'Created',
  dateModified: 'Modified',
  datePublished: 'Published',
};

const SUPPORTED_REPOS = [
  'FigShare',
  'DataONE',
  'DataCite',
];

export {
  ATTRIBUTES_DISPLAY,
  ATTRIBUTES,
  DATE_ATTR_DISPLAY,
  SUPPORTED_REPOS,
};
