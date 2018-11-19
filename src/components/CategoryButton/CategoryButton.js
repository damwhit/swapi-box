import React from 'react';
import { NavLink } from "react-router-dom";

function CategoryButton(props) {
  const category = props.value;
  const linkPath = `/${category}`;
  return (
    <NavLink to={linkPath} activeClassName="btn--category">
      <button onClick={props.onClick}>
        {category}
      </button>
    </NavLink>
  );
}

export default CategoryButton;
