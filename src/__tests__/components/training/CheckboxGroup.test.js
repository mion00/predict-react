import React from 'react';
import {shallow} from 'enzyme';
import {classificationMethods, regressionMethods} from '../../../reference';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import CheckboxGroup from '../../../components/training/CheckboxGroup';

describe('CheckboxGroup', () => {
  it('renders classification methods', () => {
    const element = shallow(<CheckboxGroup controls={classificationMethods} id="classification"
                                           label="Classification methods"
                                           onChange={jest.fn()}
                                           value={classificationMethods[0].value}/>);
    expect(element).toBeDefined();
    expect(element.find(SelectionControlGroup).length).toBe(1);
  });

  it('renders regression methods', () => {
    const element = shallow(<CheckboxGroup controls={regressionMethods} id="regression"
                                           label="Reg methods"
                                           onChange={jest.fn()}
                                           value={regressionMethods[0].value}/>);
    expect(element).toBeDefined();
    expect(element.find(SelectionControlGroup).length).toBe(1);
  });
});
