import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    query: state.query,
  };
}

class Results extends React.Component {
  render() {
    return <div>Hello, Results!</div>
  }
}

export default connect(mapStateToProps)(Results);
