import PropTypes from 'prop-types';
import React from 'react';
import './ResultCard.css';

const ResultCard = ({ onClick, result }) => {
  const className = `card card--favorite-${result.isFavorite}`;
  return (
    <article
      className={className}
    >
      {result.name}
      <button
        className="btn"
        onClick={onClick}
        type="button"
      >
        favorite
      </button>
    </article>
  );
};

ResultCard.propTypes = {
  result: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ResultCard;
