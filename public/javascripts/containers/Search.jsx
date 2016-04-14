import React from 'react';
import { connect } from 'react-redux';
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
    e.preventDefault();
    console.log('search!');
  }

  addField() {
    this.props.dispatch(addField());
  }

  removeField(attribute) {
    console.log('remove field');
    this.props.dispatch(removeField(attribute));
  }

  render() {
    const query = this.props.query;
    let count = 0;

    this.fields = Object.keys(query).map(attribute => {
      return <SearchField
        key={attribute}
        attribute={attribute}
        value={query[attribute]}
        withDelete={count++ > 0}
        addField={this.addField}
        removeField={this.removeField}/>
    });

    return (
      <div>
        {this.fields}
        <button
            className="pure-button search-button"
            onClick={this.search}>
          Search
        </button>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Search);