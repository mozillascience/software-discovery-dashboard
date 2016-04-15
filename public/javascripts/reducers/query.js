import { ATTRIBUTES } from '../constants';
import {
  ADD_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
  CHANGE_PAGE
} from '../actions/query';

function firstUnusedAttribute(state) {
  let firstUnused = '';

  ATTRIBUTES.forEach(a => {
    if (!firstUnused && state[a] === undefined) firstUnused = a;
  });

  return firstUnused;
}

export default function query(state = {}, action) {
  const copiedState = Object.assign({}, state);
  copiedState.fields = Object.assign({}, state.fields);
  const addedField = action.attribute || firstUnusedAttribute(state);

  switch (action.type) {
    case ADD_FIELD:
      if (addedField) {
        Object.assign(copiedState.fields, { [addedField]: '' });
        return copiedState;
      } else {
        return state;
      }

    case UPDATE_FIELD:
      Object.assign(copiedState.fields, { [addedField]: action.value });
      return copiedState;

    case REMOVE_FIELD:
      delete copiedState.fields[action.attribute];
      return copiedState;

    case CHANGE_PAGE:
      return Object.assign(copiedState, { page: action.page });

    default:
      return state;
  }
}
