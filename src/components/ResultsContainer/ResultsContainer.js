import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ResultCard from '../ResultCard/ResultCard';

class ResultsContainer extends Component {
  renderResultCard(result) {
    const { onClick } = this.props;
    return (
      <ResultCard
        key={result.name}
        onClick={() => onClick(result.name)}
        result={result}
      />
    );
  }

  render() {
    const {
      category, error, isLoaded, resources,
    } = this.props;
    let results;
    if (category === 'favorites') {
      results = resources.filter(resource => resource.isFavorite);
    } else {
      results = resources.filter(resource => resource.category === category);
    }
    const noResults = results.length < 1;
    if (error) {
      return (
        <div>
Error:
          {error.message}
        </div>
      );
    }
    if (!isLoaded) return <div>Loading...</div>;
    if (noResults && category === 'favorites') {
      return <article>You have no Favorites</article>;
    }
    if (noResults) return <article>Pick a category</article>;
    return results.map(result => this.renderResultCard(result));
  }
}

ResultsContainer.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(Error),
  ]),
};

export default ResultsContainer;
