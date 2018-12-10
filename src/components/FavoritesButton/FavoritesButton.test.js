import React from 'react';
import { shallow } from 'enzyme';
import FavoritesButton from './FavoritesButton';

describe('FavoritesButton', () => {
  const onClickMock = jest.fn();
  const wrapper = shallow(
    <FavoritesButton
      onClick={onClickMock}
      numFavorites={3}
    />
  );
  

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the onClick prop when clicked', () => {
    const button = wrapper.find('.btn--favorite');
    button.simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
