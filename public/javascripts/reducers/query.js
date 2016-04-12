import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from '../actions/query';

export default function query(state = {}, action) {
  switch (action.type) {
    case ADD_FIELD:
      return Object.assign({}, state, { [action.attribute]: '' });

    case UPDATE_FIELD:
      return Object.assign({}, state, { [action.attribute]: action.value });

    case REMOVE_FIELD:
      var newState = Object.assign({}, state);
      delete newState[action.attribute];
      return newState;

    default:
      return state;
  }
};