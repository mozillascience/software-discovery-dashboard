import React from 'react';
import RepoFilter from '../containers/RepoFilter';
import Search from '../containers/Search';

function Home({ children }) {
  return (
    <div>
      <div className="text-center">
        <img className="sd-logo"
          src="images/openSDLogo.png"
          width="1348px"
          height="1217px"
          alt="logo"
        />
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
      {children}
    </div>
  );
}

Home.propTypes = {
  children: React.PropTypes.node,
};

export default Home;
