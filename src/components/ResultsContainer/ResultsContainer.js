import React, { Component } from 'react';
import ResultCard from '../ResultCard/ResultCard.js';

class ResultsContainer extends Component {
  renderResultCard(result) {
    return (
      <ResultCard 
        key={result.name}
        onClick={() => this.props.onClick(result.name)} 
        value={result}
      />
    );
  }
  render() {
    let results;
    if (this.props.results.length < 0) {
      results = <article>Pick a category</article>;
    } else {
      results = this.props.results.map((result) => {
        return this.renderResultCard(result);
      });
      return results
    }
  }
}

export default ResultsContainer;
