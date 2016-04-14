import React from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import { findKey } from '../util/objectUtils';

function mapStateToProps(state) {
  return {
    repo: state.repoFilters,
    query: state.query,
  };
}

class Results extends React.Component {
  render() {
    const results = [
      {
        title: 'Test Result',
        source: 'http://www.mozilla.org',
        description: 'Lorem dim sum Lo baak gou Taro cake Deep fried pumpkin and egg-yolk ball vegetarian crisp spring rolls dried scallop and leek puff deep fried seaweed roll BBQ pork puff Pan friend pork dumpling Pot sticker water chestnut cake.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4'],
      },
      {
        title: 'Another Test Result',
        source: 'http://www.mozilla.org',
        description: 'Lorem dim sum Lo baak gou Taro cake Deep fried pumpkin and egg-yolk ball vegetarian crisp spring rolls dried scallop and leek puff deep fried seaweed roll BBQ pork puff Pan friend pork dumpling Pot sticker water chestnut cake.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4'],
      },
      {
        title: 'Yet Another Test Result',
        source: 'http://www.mozilla.org',
        description: 'Lorem dim sum Lo baak gou Taro cake Deep fried pumpkin and egg-yolk ball vegetarian crisp spring rolls dried scallop and leek puff deep fried seaweed roll BBQ pork puff Pan friend pork dumpling Pot sticker water chestnut cake.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4'],
      },
      {
        title: 'One Last Test Result',
        source: 'http://www.mozilla.org',
        description: 'Lorem dim sum Lo baak gou Taro cake Deep fried pumpkin and egg-yolk ball vegetarian crisp spring rolls dried scallop and leek puff deep fried seaweed roll BBQ pork puff Pan friend pork dumpling Pot sticker water chestnut cake.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4'],
      },
    ]

    // TODO this will change when querying multiple sources is supported
    const queryInputString =
      'sources:' + findKey(this.props.repo, true) + ' ' +
      Object.keys(this.props.query).map(a => {
        return a + ':' + this.props.query[a]
          .trim()
          .replace(/,/g, ' ')
          .replace(/\s+/g, ',');
      }).join(' ');

    return (
      <div className="results-container">
        <form className="pure-form results-query-summary">
          <fieldset>
            <input type="text"
              className="results-query-input"
              defaultValue={queryInputString}
              ref="results-query-input"/>
          </fieldset>
        </form>
        <div className="results">
          <ul className="results-list">
            {results.map(r => {
              return <Result
                title={r.title}
                source={r.source}
                description={r.description}
                keywords={r.keywords}
                key={r.title + r.source}/>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Results);
