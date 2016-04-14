'use strict';

import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class App extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);