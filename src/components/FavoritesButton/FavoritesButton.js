import React from 'react';
import { NavLink } from "react-router-dom";

function FavoritesButton(props) {
  return (
    <NavLink to="/favorites" activeClassName="btn--favorite">
      <button onClick={props.onClick}>
        Show Favorites ({props.value})
      </button>
    </NavLink>
  );
}

export default FavoritesButton;
