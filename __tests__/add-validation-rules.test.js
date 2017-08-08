import ValidationUtil from '../src/TECH-101/validation-util';
import { mockContent } from '../__mocks__/content';
import { Map, fromJS } from 'immutable';
const content = fromJS(mockContent);
ValidationUtil.setData(content);

// a rule is one to many relationship, but the identifier can be an Array
test('One should be able to set rule names with an Array', () => {
  let hasToBeDefined = (value) => !!value;
  ValidationUtil.setRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired'], hasToBeDefined);
  expect(ValidationUtil.getRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired']).toString())
    .toEqual(hasToBeDefined.toString());
});

// identifier can be a String
test('One should be able to set rule names with a String', () => {
  let hasToBeDefined = (value) => !!value;
  ValidationUtil.setRule('description', hasToBeDefined);
  expect(ValidationUtil.getRule('description').toString())
    .toEqual(hasToBeDefined.toString());
});

// identifier can be a CSV String
test('One should be able to set rule names with a CSV String', () => {
  let hasToBeDefined = (value) => !!value;
  ValidationUtil.setRule('damageItemDetails, contentDetail, shouldBeRepaired', hasToBeDefined);
  expect(ValidationUtil.getRule('damageItemDetails, contentDetail, shouldBeRepaired').toString())
    .toEqual(hasToBeDefined.toString());
});

// identifier can be a CSV String
test('One should be able to set rules with an Array', () => {
  let hasToBeDefined = (value) => !!value;
  let hasToBeBiggerThan = (value, num) => value > num;
  ValidationUtil.setRule('description', [hasToBeDefined, hasToBeBiggerThan]);
  expect(ValidationUtil.getRule('description').length)
    .toEqual(2);
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with no equivalent named function should throw an exception in _mapRules', () => {
  expect(() => { ValidationUtil._mapRules(['foo']); }).toThrow();
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with an array with no equivalent named function should throw an exception', () => {
  expect(() => { ValidationUtil.setRule('description', ['foo']); }).toThrow();
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with a String with no equivalent named function should throw an exception', () => {
  expect(() => { ValidationUtil.setRule('description', 'foo'); }).toThrow();
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set rule with named function identifier', () => {
  ValidationUtil.setRule('description', 'required');
  expect(ValidationUtil.getRule('description').length)
    .toEqual(1);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set multiple named rules', () => {
  ValidationUtil.setRule('description', 'required, feature');
  expect(ValidationUtil.getRule('description').length)
    .toEqual(2);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set multiple named rules', () => {
  ValidationUtil.setRule('description', 'required, feature');
  expect(ValidationUtil.getRule('description').length)
    .toEqual(2);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should pass the test with required rule with fooo value', () => {
  ValidationUtil.setRule('description', 'required');
  expect(ValidationUtil.test('description')).toBeTruthy();
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should pass the test with required rule and custom function with fooo value', () => {
  ValidationUtil.setRule('description', ['required', (value) => {
    console.log('value', value.length > 3);
    return value.length > 3;
  }]);
  expect(ValidationUtil.test('description')).toBeTruthy();
});

test('One should pass the test with required rule and custom function with correct values', () => {
  ValidationUtil.reset();
  ValidationUtil.setRule('description', 'required');
  ValidationUtil.setRule('quantity', ['required', value => value >= 0]);
  ValidationUtil.setRule(
    'damageItemDetails, unitPriceDetails, unitPrice', value => value >= 0);
  expect(ValidationUtil.test()).toBeTruthy();
});



// // a rule is one to many relation ship, but the identifier can be an Array
// test('One should be able to set rule names with and Array', () => {
//   ValidationUtil.setRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired'], (value) => !!value);
//   expect(ValidationUtil.getRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired'])).toEqual((value) => !!value);
// });
//
// // a rule is one to many relation ship, but the identifier can be an Array
// test('One should be able to set rule names with a string', () => {
//   ValidationUtil.setRule('description', (value) => !!value);
//   expect(ValidationUtil.getRule('description')).toEqual((value) => !!value);
// });
