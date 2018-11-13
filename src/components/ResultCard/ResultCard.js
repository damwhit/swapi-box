import React from 'react';
import './ResultCard.css';

function ResultCard(props) {
  let result = props.value;
  return (
    <article>
      {result.name}
      <button
        className={`btn btn--favorite btn--favorite-${result.isFavorite}`}
        onClick={props.onClick}
      >
        favorite
      </button>
    </article>
  );
}

export default ResultCard;
