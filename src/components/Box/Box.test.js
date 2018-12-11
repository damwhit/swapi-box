import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

describe('Box', () => {
  const mockResources = [
    {name: 'Alderaan', category: 'planets', isFavorite: true},
    {name: 'Dagobah', category: 'planets', isFavorite: false},
    {name: 'Endor', category: 'planets', isFavorite: false},
    {name: 'Earth', category: 'planets', isFavorite: true},
  ];
  const wrapper = shallow(<Box />);

  beforeEach(() => {
    wrapper.setState({
      resources: mockResources,
    });
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the state with the number of favorite resources', () => {
    // Execution
    wrapper.instance().countFavorites();

    // Expectation
    expect(wrapper.state('numFavorites')).toBe(2);
  });

  it('should toggle the isFavorite property of a resource based on it\'s name', () => {
    expect(wrapper.state('resources')[1].isFavorite).toBe(false);

    wrapper.instance().toggleFavoriteResource('Dagobah');
    expect(wrapper.state('resources')[1].isFavorite).toBe(true);


    wrapper.instance().toggleFavoriteResource('Dagobah');
    expect(wrapper.state('resources')[1].isFavorite).toBe(false);
  });
});
