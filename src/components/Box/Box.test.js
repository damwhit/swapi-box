import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

describe('Box', () => {
  it('should update the state with the number of favorite resources', () => {
    // Setup
    const wrapper = shallow(<Box />);
    const mockResources = [
      { name: 'Han Solo', isFavorite: true },
      { name: 'Chewbacca', isFavorite: true },
      { name: 'Luke Skywalker', isFavorite: false },
    ];

    wrapper.setState({
      resources: mockResources,
    });

    // Execution
    wrapper.instance().countFavorites();

    // Expectation
    expect(wrapper.state('numFavorites')).toEqual(2);
  });
});
