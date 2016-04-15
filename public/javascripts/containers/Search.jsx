import React from 'react';
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
    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
  }

  search(e) {
    Object.keys(this.refs).forEach(f => {
      this.props.dispatch(updateField(f, this.refs[f].value()));
    });
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

    this.fields = Object.keys(fields).map(attribute => {
      return <SearchField
        key={attribute}
        attribute={attribute}
        value={fields[attribute]}
        withDelete={count++ > 0}
        addField={this.addField}
        removeField={this.removeField}
        ref={attribute}/>
    });

    return (
      <div>
        {this.fields}
        <Link to="/results">
          <button
              className="pure-button search-button"
              onClick={this.search}>
            Search
          </button>
        </Link>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Search);
