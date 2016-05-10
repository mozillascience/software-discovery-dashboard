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

const REPO_DISPLAY_NAMES = {
  datacite: 'DataCite',
  github: 'GitHub',
  dataone: 'DataONE',
  bitbucket: 'BitBucket',
  figshare: 'FigShare',
  zenodo: 'Zenodo',
};

const SUPPORTED_REPOS = [
  'figshare',
  'dataone',
  'zenodo',
];

export {
  ATTRIBUTES_DISPLAY,
  ATTRIBUTES,
  DATE_ATTR_DISPLAY,
  REPO_DISPLAY_NAMES,
  SUPPORTED_REPOS,
};
