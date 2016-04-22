import React from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import Pagination from './Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { findKey } from '../util/objectUtils';
import { performQuery } from '../actions/results';
import { selectRepo } from '../actions/repoFilter';
import { replaceQuery } from '../actions/query';
import {
  getArrayStringFromRepoQuery,
  getRepoQueryFromArrayString,
} from '../util/query';

function mapStateToProps(state) {
  return {
    repo: state.repoFilters,
    query: state.query,
    results: state.results,
  };
}

class Results extends React.Component {

  constructor() {
    super();

    this.renderLoading = this.renderLoading.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      loading: true,
      needsReload: false,
    };
  }

  componentWillMount() {
    // TODO this will change when querying multiple sources is supported
    const repo = findKey(this.props.repo, true);
    this.props.dispatch(performQuery(repo, this.props.query));
  }

  componentWillReceiveProps(newProps) {
    if (this.state.needsReload) {
      this.setState({ loading: true, needsReload: false });
      const repo = findKey(newProps.repo, true);
      this.props.dispatch(performQuery(repo, newProps.query));
    } else {
      this.setState({ loading: false });
    }
  }

  search(e) {
    e.preventDefault();
    const repoQuery =
      getRepoQueryFromArrayString(this.refs.resultsQueryInput.value);
    // assumes one repo selected at a time
    this.props.dispatch(selectRepo(repoQuery.repo));
    this.props.dispatch(replaceQuery(repoQuery.query));
    this.setState({ needsReload: true });
  }

  pageChanged() {
    this.setState({ needsReload: true });
  }

  renderLoading() {
    return <LoadingSpinner />;
  }

  renderResults() {
    return (
      <div>
        <div className="results">
          <ul className="results-list">
            {this.props.results.articles.map(r =>
              <Result
                result={r}
                key={r.id || r.identifier.replace('/', '')}
              />
            )}
            <li>
              <Pagination onPageChange={this.pageChanged} />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderResultsQuerySummary() {
    const queryInputString =
      getArrayStringFromRepoQuery(this.props.repo, this.props.query);

    return (
      <form className="pure-form results-query-summary">
        <fieldset>
          <input type="text"
            className="results-query-input"
            defaultValue={queryInputString}
            ref="resultsQueryInput"
          />
        </fieldset>
        <button
          className="pure-button pure-button-primary result-search-button"
          onClick={this.search}
          disabled={this.state.loading}
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="results-container">
        {this.renderResultsQuerySummary()}
        {this.state.loading ? this.renderLoading() : this.renderResults()}
      </div>
    );
  }
}

Results.propTypes = {
  repo: React.PropTypes.object,
  query: React.PropTypes.object,
  results: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(Results);
