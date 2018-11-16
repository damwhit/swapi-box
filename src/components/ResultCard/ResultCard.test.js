import React from 'react';
import { mount, shallow } from 'enzyme';
import ResultCard from './ResultCard';

describe('ResultCard', () => {

  const favoriteResult = {
    name: 'Chewy',
    isFavorite: true,
  };

  const wrapper = shallow(
    <ResultCard
      value={favoriteResult}
      onClick={jest.fn()}
    />
  );

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should have a className of "starred" if is starred', () => {
    expect(wrapper.is('.card--favorite-true')).toEqual(true);
  });

  it('should call the onClick prop when clicked', () => {
    const onClickMock = jest.fn();

    const wrapper = mount(
      <ResultCard
        value={favoriteResult}
        onClick={onClickMock}
      />
    );

    wrapper.find('.btn').simulate('click');

    expect(onClickMock).toBeCalled();
  }); 
});
