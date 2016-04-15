import React from 'react';
import { connect } from 'react-redux';
import RepoFilter from './RepoFilter';
import Search from './Search';

function mapStateToProps(state) {
  return {};
}

class Home extends React.Component {

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
              <Search />
            </div>
          </form>
        </div>
        {this.props.children}
      </div>
    );
  }

}

export default connect(mapStateToProps)(Home);