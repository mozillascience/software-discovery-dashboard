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
        {/*<div className="text-center">
          <h1>Software Discovery Dashboard</h1>
        </div>

        <div id="form" className="form-div center">
          <form>
            <div className="form-group">
              <RepoFilter />
            </div>
            <div className="input-group">
              <div className="input-group-btn select-div">
                <select className="form-control">
                  <option value="author">Author</option>
                  <option value="identifier">Identifier</option>
                  <option value="datePublished">Date Published</option>
                  <option value="dateModified">Date Modified</option>
                  <option value="dateCreated">Date Created</option>
                  <option value="description">Description</option>
                  <option value="keywords">Keywords</option>
                  <option value="license">License</option>
                  <option value="title">Title</option>
                  <option value="version">Version</option>
                </select>
              </div>
              <input type="text" className="form-control"></input>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">+</button>
              </span>
            </div>
          </form>
        </div>*/}
        <div className="results">
          <ul className="resultsList">
            <li>
              <div className="result">
                <h1>TITLE GOES HERE</h1>
                <a src="joesbbqandfootmassage.html">website.com</a>
                <p>Polaroid bitters skateboard kinfolk distillery gentrify, franzen gastropub fashion 
                axe kitsch mixtape neutra pitchfork. Offal gochujang salvia distillery, health goth kombucha 
                letterpress lomo bespoke portland ramps helvetica umami paleo banjo. Affogato trust fund aesthetic cray. 
                Waistcoat tumblr gentrify artisan offal, hoodie drinking vinegar farm-to-table cold-pressed chartreuse 
                organic mlkshk four dollar toast crucifix. Jean shorts hashtag man braid 90s brooklyn kitsch gastropub lomo.
                 Ethical tumblr literally intelligentsia pinterest. Flannel literally street art distillery,
                  artisan pug mustache photo booth.
                </p>
                <ul className="keywordsList">
                  <li className="keyword">Keyword1</li>
                  <li className="keyword">keyword2</li>
                  <li className="keyword">keyword3</li>
                </ul>
                <div className="clear"></div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);