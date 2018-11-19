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
    const results = this.props.results;
    const noResults = results.length < 1;
    if (noResults && this.props.category === 'favorites') return <article>You have no Favorites</article>;
    if (noResults) return <article>Pick a category</article>;
    return results.map((result) => {
      return this.renderResultCard(result);
    });
  }
}

export default ResultsContainer;
