import React from 'react';
import { mount } from 'enzyme';
import InputNumber from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';

describe('InputNumber', () => {
  focusTest(InputNumber);
  mountTest(InputNumber);

  // https://github.com/wsdo/daji/issues/13896
  it('should return null when blur a empty input number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<InputNumber defaultValue="1" onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith('');
    wrapper.find('input').simulate('blur');
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
