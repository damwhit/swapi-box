import React from 'react';
function FavoritesButton(props) {
  return (
    <button onClick={props.onClick}>
      Show Favorites ({props.value})
    </button>
  );
}

export default FavoritesButton;
