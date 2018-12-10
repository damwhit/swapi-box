import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function FavoritesButton({ onClick, numFavorites }) {
  return (
    <NavLink to="/favorites" className="link--favorite">
      <button
        className="btn--favorite"
        onClick={onClick}
        type="button"
      >
        Show Favorites (
        {numFavorites}
        )
      </button>
    </NavLink>
  );
}

FavoritesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  numFavorites: PropTypes.number.isRequired,
};

export default FavoritesButton;
