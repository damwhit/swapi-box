import React from 'react';
function CategoryButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default CategoryButton;
