import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from '../actions/query';

export default function query(state = {}, action) {
  const copiedState = Object.assign({}, state);

  switch (action.type) {
    case ADD_FIELD:
      return Object.assign(copiedState, { [action.attribute]: '' });

    case UPDATE_FIELD:
      return Object.assign(copiedState, { [action.attribute]: action.value });

    case REMOVE_FIELD:
      delete copiedState[action.attribute];
      return copiedState;

    default:
      return state;
  }
}
