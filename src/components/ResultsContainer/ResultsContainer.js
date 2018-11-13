import React from 'react'

function ResultsContainer(props) {
  let results;
  if (props.results.length < 0) {
    results = <article>Pick a category</article>;
  } else {
    results = props.results.map((item) => {
      return <article key={item.name}>{item.name}</article>
    });
    return results
  }
}

export default ResultsContainer;
