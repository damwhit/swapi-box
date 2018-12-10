import React from 'react';
import { shallow } from 'enzyme';
import Scroll from './Scroll';

describe('Scroll', () => {
  const wrapper = shallow(
    <Scroll />
  );

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
