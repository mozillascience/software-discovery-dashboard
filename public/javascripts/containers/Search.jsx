import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addField, removeField, updateField } from '../actions/query';
import SearchField from '../components/SearchField';

function mapStateToProps(state) {
  return {
    query: state.query,
  };
}

class Search extends React.Component {

  constructor() {
    super();

    this.search = this.search.bind(this);
    this.searchEnter = this.searchEnter.bind(this);
    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
  }

  search() {
    const fields = Object.keys(this.props.query.fields);

    fields.forEach(f => {
      this.props.dispatch(updateField(f, this.refs[f].value()));
    });
  }

  searchEnter() {
    this.refs.searchButton.click();
  }

  addField(attribute) {
    this.props.dispatch(addField(attribute));
  }

  removeField(attribute) {
    this.props.dispatch(removeField(attribute));
  }

  render() {
    const fields = this.props.query.fields;
    let count = 0;

    const searchFields = Object.keys(fields).map(attribute =>
      <SearchField
        key={attribute}
        attribute={attribute}
        value={fields[attribute]}
        withDelete={count++ > 0}
        addField={this.addField}
        removeField={this.removeField}
        search={this.searchEnter}
        ref={attribute}
      />
    );

    return (
      <div>
        {searchFields}
        <Link to="/results">
          <button
            className="pure-button search-button"
            onClick={this.search}
            ref="searchButton"
          >
            Search
          </button>
        </Link>
      </div>
    );
  }

}

Search.propTypes = {
  dispatch: React.PropTypes.func,
  query: React.PropTypes.object,
};

export default connect(mapStateToProps)(Search);
