import { ATTRIBUTES } from '../constants';
import {
  ADD_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
  CHANGE_PAGE,
} from '../actions/query';

function firstUnusedAttribute(fields) {
  let firstUnused = '';

  ATTRIBUTES.forEach(a => {
    if (!firstUnused && fields[a] === undefined) firstUnused = a;
  });

  return firstUnused;
}

export default function query(state = {}, action) {
  const copiedState = Object.assign({}, state);
  copiedState.fields = Object.assign({}, state.fields);
  let addedField = '';
  let newState = {};

  switch (action.type) {
    case ADD_FIELD:
      addedField = action.attribute || firstUnusedAttribute(state.fields);
      if (addedField) {
        Object.assign(copiedState.fields, { [addedField]: '' });
        newState = copiedState;
      } else {
        newState = state;
      }

      return newState;

    case UPDATE_FIELD:
      addedField = action.attribute || firstUnusedAttribute(state.fields);
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
