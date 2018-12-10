import React from 'react';
import { shallow } from 'enzyme';
import ResultsContainer from './ResultsContainer';

describe('ResultsContainer', () => {
  const mockResources = [
    {name: 'Alderaan', category: 'planets', isFavorite: false},
    {name: 'Dagobah', category: 'planets', isFavorite: false},
    {name: 'Endor', category: 'planets', isFavorite: false},
  ];
  const wrapper = shallow(
    <ResultsContainer 
      category="people"
      onClick={jest.fn()}
      resources={mockResources}
      isLoaded={true}
      error={null}
    />
  );

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
