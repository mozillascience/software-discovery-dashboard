import React from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import Pagination from './Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { findAllKeys } from '../util/objectUtils';
import { normalizeCommaSeparated } from '../util/stringUtils';
import { performQuery } from '../actions/results';

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
    this.goBack = this.goBack.bind(this);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    const repos = findAllKeys(this.props.repo, true);
    this.props.dispatch(performQuery(repos, this.props.query));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query.page !== this.props.query.page) {
      this.setState({ loading: true });
      const repos = findAllKeys(newProps.repo, true);
      this.props.dispatch(performQuery(repos, newProps.query));
    } else {
      this.setState({ loading: false });
    }
  }

  goBack(e) {
    e.preventDefault();
    window.history.back();
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
                key={(r.identifier && r.identifier.replace('/', '')) || r.id}
              />
            )}
            <li>
              <Pagination />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderResultsQuerySummary() {
    const sources = `sources:${findAllKeys(this.props.repo, true)} `;
    const fields = Object.keys(this.props.query.fields).map(a =>
      `${a}:${normalizeCommaSeparated(this.props.query.fields[a])}`
    ).join(' ');
    const queryInputString = sources + fields;

    return (
      <div>
        <form className="pure-form results-query-summary">
          <button
            className="pure-button results-go-back-button"
            onClick={this.goBack}
          >
            <i className="fa fa-long-arrow-left"></i>
          </button>
          <fieldset>
            <input type="text"
              className="results-query-input"
              defaultValue={queryInputString}
              ref="results-query-input"
              disabled
            />
          </fieldset>
        </form>
      </div>
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
