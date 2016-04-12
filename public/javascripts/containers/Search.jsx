import React from 'react';
import { connect } from 'react-redux';
import SearchField from '../components/SearchField';

function mapStateToProps(state) {
  return {
    query: state.query,
  };
}

class Search extends React.Component {

  render () {
    const query = this.props.query;
    const fields = Object.keys(query).map(attribute => {
      return <SearchField
        key={attribute}
        keyword={attribute}
        value={query[attribute]} />
    });

    return (
      <div>
        {fields}
      </div>
    );
  }

}

export default connect(mapStateToProps)(Search);