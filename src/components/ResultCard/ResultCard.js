import React from 'react';
import './ResultCard.css';

function ResultCard(props) {
  const result = props.value;
  const className = `card card--favorite-${result.isFavorite}`;
  return (
    <article
      className={className}
    >
      {result.name}
      <button
        className="btn"
        onClick={props.onClick}
      >
        favorite
      </button>
    </article>
  );
}

export default ResultCard;
