import React from 'react';
import { shallow } from 'enzyme';
import CategoryButton from './CategoryButton';

describe('CategoryButton', () => {
  const onClickMock = jest.fn();
  const wrapper = shallow(
    <CategoryButton
      category='people'
      onClick={onClickMock}
    />
  );
  

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the onClick prop when clicked', () => {
    const button = wrapper.find('.btn--category');
    button.simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
