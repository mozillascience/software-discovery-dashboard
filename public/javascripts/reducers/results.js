import { ADD_RESULTS_SUCCESS, ADD_RESULTS_FAILURE } from '../actions/results';

export default function results(state = {}, action) {
  switch (action.type) {
    case ADD_RESULTS_SUCCESS:
      return Object.assign({}, state, action.results);

    case ADD_RESULTS_FAILURE:
    default:
      return state;
  }
}
