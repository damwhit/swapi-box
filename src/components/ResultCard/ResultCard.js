import React from 'react';

function ResultCard(props) {
  let result = props.value;
  return (
    <article>
      {result.name}
      <button onClick={props.onClick}>favorite</button>
    </article>
  );
}

export default ResultCard;
