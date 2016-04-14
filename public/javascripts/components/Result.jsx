import React from 'react';

class Result extends React.Component {
  
  render() {
    return (
      <li>
        <div className="result">
          <h1>{this.props.title}</h1>
          <a src={this.props.source}>{this.props.source}</a>
          <p>{this.props.description}</p>
          <ul className="keywords-list">
            {this.props.keywords.map(k => {
              return <li key={k}>{k}</li>
            })}
          </ul>
        </div>
      </li>
    );
  }

}

export default Result;
