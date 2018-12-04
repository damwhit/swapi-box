import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function CategoryButton({ category, onClick }) {
  const linkPath = `/${category}`;
  return (
    <NavLink to={linkPath} activeClassName="btn--category">
      <button
        onClick={onClick}
        type="button"
      >
        {category}
      </button>
    </NavLink>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
