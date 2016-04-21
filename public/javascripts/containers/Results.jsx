import React from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import Pagination from './Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { findKey } from '../util/objectUtils';
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

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    // TODO this will change when querying multiple sources is supported
    const repo = findKey(this.props.repo, true);
    this.props.dispatch(performQuery(repo, this.props.query));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query.page !== this.props.query.page) {
      this.setState({ loading: true });
      const repo = findKey(newProps.repo, true);
      this.props.dispatch(performQuery(repo, newProps.query));
    } else {
      this.setState({ loading: false });
    }
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
              <Pagination />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderResultsQuerySummary() {
    // TODO this will change when querying multiple sources is supported
    const sources = `sources:${findKey(this.props.repo, true)} `;
    const fields = Object.keys(this.props.query.fields).map(a =>
      `${a}:${normalizeCommaSeparated(this.props.query.fields[a])}`
    ).join(' ');
    const queryInputString = sources + fields;

    return (
      <form className="pure-form results-query-summary">
        <fieldset>
          <input type="text"
            className="results-query-input"
            defaultValue={queryInputString}
            ref="results-query-input"
          />
        </fieldset>
        <button
          className="pure-button pure-button-primary result-search-button">
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
