'use strict';

import React from 'react';
import { connect } from 'react-redux';
import RepoFilter from './RepoFilter';

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
        <div className="text-center">
          <h1>Software Discovery Dashboard</h1>
        </div>

        <div id="form" className="form-div center">
          <form>
            <div className="form-group">
              <RepoFilter />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);