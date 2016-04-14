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

const SUPPORTED_REPOS = [
  'FigShare',
  'DataONE',
];

export { ATTRIBUTES_DISPLAY, ATTRIBUTES, SUPPORTED_REPOS };
