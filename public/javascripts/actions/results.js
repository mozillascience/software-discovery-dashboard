import { queryForResults } from '../providers/results';

export const ADD_RESULTS_SUCCESS = 'ADD_RESULTS_SUCCESS';
export const ADD_RESULTS_FAILURE = 'ADD_RESULTS_FAILURE';

function addResultsSuccess(results) {
  return {
    type: ADD_RESULTS_SUCCESS,
    results: {
      meta: {
        currentPage: results.responseHeader.currentPage,
        lastPage: results.responseHeader.lastPage,
      },
      articles: results.parsedArticles,
    },
  };
}

function addResultsFailure() {
  return {
    type: ADD_RESULTS_FAILURE,
    err
  };
}

export function performQuery(source, query) {
  return dispatch => {
    queryForResults(source, query, r => {
      dispatch(addResultsSuccess(r));
    }, err => {
      dispatch(addResultsFailure(err));
    });
  }
}