import ValidationUtil from '../src/TECH-101/validation-util';
import { mockContent } from '../__mocks__/content';
import { Map, fromJS } from 'immutable';
const content = fromJS(mockContent);
ValidationUtil.setData(content);

const FailingData = [{
  name: "description",
  value: ''
},{
  name: "quantity",
  value: ''
}]

const PassingData = [{
  name: "description",
  value: 'f'
},{
  name: "quantity",
  value: 1
}]

// ValidationUtil.setFields([{name:'description', rules: ['required']}, {name:'description', rules: ['required']}]);

// test('Validation with input name "description" should fail with undefined input', () => {
//   expect(ValidationUtil.validateField({description: value})).toBe('The description field is required');
// });
//
// test('Validation with inputs "description" and "quantity" should fail with undefined inputs', () => {
//   expect(ValidationUtil.validate(FailingData)).toBe('The description field is required');
// });

// both name and rules should be wrapped in an array so we always operate with arrays


test('Validation with rule for "description" should succeed with string inputs', () => {
  ValidationUtil.setRule('description', (value) => !!value);
  expect(ValidationUtil.test('description')).toBeTruthy();
});


test('One should be able to test with custom function', () => {
  ValidationUtil.setRule('description', 'required');
  expect(ValidationUtil.test('description')).toBeTruthy();
});


test('Validation for all the fields should succeed with string inputs', () => {
  ValidationUtil.setRule('description', (value) => !!value);
  ValidationUtil.setRule('quantity', (value) => value > 0);
  expect(ValidationUtil.test()).toBeTruthy();
});

test('Validation for all the fields should not succeed with quantity not being zero', () => {
  ValidationUtil.setRule('description', (value) => !!value);
  ValidationUtil.setRule('quantity', (value) => value === 0);
  expect(ValidationUtil.test()).toBeFalsy();
});

test('One should be able to set an rule array', () => {
  ValidationUtil.setRule('description', [(value) => !!value, 'min=30']);
  //validationUtil.setRule('quantity', (value) => value === 0);
  expect(ValidationUtil.test()).toBeFalsy();
  //expect(false).toBeFalsy();
});

/*

  handleChange = (path, value) => {
    var error = ValidationUtil.test(path, value);
  }
*/
