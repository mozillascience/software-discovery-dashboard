import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from '../actions/query';
import { ATTRIBUTES } from '../constants';

function firstUnusedAttribute(state) {
  var firstUnused = '';

  ATTRIBUTES.forEach(a => {
    if (!firstUnused && state[a] === undefined) firstUnused = a;
  });

  return firstUnused;
}

export default function query(state = {}, action) {
  const copiedState = Object.assign({}, state);
  const addedField = action.attribute || firstUnusedAttribute(state);

  switch (action.type) {
    case ADD_FIELD:
      if (addedField)
        return Object.assign(copiedState, { [addedField]: '' });
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