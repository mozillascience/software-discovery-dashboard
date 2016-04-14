import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from '../actions/query';

const ATTRIBUTES = [
  'author',
  'id',
  'datePublished',
  'dateModified',
  'dateCreated',
  'description',
  'keywords',
  'license',
  'title',
  'version',
];

function firstUnusedAttribute(state) {
  var firstUnused = '';
  console.log(state);

  ATTRIBUTES.forEach(a => {
    if (!firstUnused && state[a] === undefined) firstUnused = a;
  });

  return firstUnused;
}

export default function query(state = {}, action) {
  const copiedState = Object.assign({}, state);
  const firstUnused = firstUnusedAttribute(state);

  switch (action.type) {
    case ADD_FIELD:
      if (firstUnused)
        return Object.assign(copiedState, { [firstUnused]: '' });
      else
        return state;

    case UPDATE_FIELD:
      return Object.assign(copiedState, { [action.attribute]: action.value });

    case REMOVE_FIELD:
      delete copiedState[action.attribute];
      return copiedState;

    default:
      return state;
  }
}
