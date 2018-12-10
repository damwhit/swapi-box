import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function CategoryButton({ category, onClick }) {
  const linkPath = `/${category}`;
  return (
    <NavLink to={linkPath} className="link--category">
      <button 
        className="btn--category"
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
