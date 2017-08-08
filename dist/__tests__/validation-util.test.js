'use strict';

var _validationUtil = require('../src/TECH-101/validation-util');

var _validationUtil2 = _interopRequireDefault(_validationUtil);

var _content = require('../__mocks__/content');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = (0, _immutable.fromJS)(_content.mockContent);
_validationUtil2.default.setData(content);

var FailingData = [{
  name: "description",
  value: ''
}, {
  name: "quantity",
  value: ''
}];

var PassingData = [{
  name: "description",
  value: 'f'
}, {
  name: "quantity",
  value: 1
}];

// ValidationUtil.setFields([{name:'description', rules: ['required']}, {name:'description', rules: ['required']}]);

// test('Validation with input name "description" should fail with undefined input', () => {
//   expect(ValidationUtil.validateField({description: value})).toBe('The description field is required');
// });
//
// test('Validation with inputs "description" and "quantity" should fail with undefined inputs', () => {
//   expect(ValidationUtil.validate(FailingData)).toBe('The description field is required');
// });

// both name and rules should be wrapped in an array so we always operate with arrays


test('Validation with rule for "description" should succeed with string inputs', function () {
  _validationUtil2.default.setRule('description', function (value) {
    return !!value;
  });
  expect(_validationUtil2.default.test('description')).toBeTruthy();
});

test('One should be able to test with custom function', function () {
  _validationUtil2.default.setRule('description', 'required');
  expect(_validationUtil2.default.test('description')).toBeTruthy();
});

test('Validation for all the fields should succeed with string inputs', function () {
  _validationUtil2.default.setRule('description', function (value) {
    return !!value;
  });
  _validationUtil2.default.setRule('quantity', function (value) {
    return value > 0;
  });
  expect(_validationUtil2.default.test()).toBeTruthy();
});

test('Validation for all the fields should not succeed with quantity not being zero', function () {
  _validationUtil2.default.setRule('description', function (value) {
    return !!value;
  });
  _validationUtil2.default.setRule('quantity', function (value) {
    return value === 0;
  });
  expect(_validationUtil2.default.test()).toBeFalsy();
});

test('One should be able to set an rule array', function () {
  _validationUtil2.default.setRule('description', [function (value) {
    return !!value;
  }, 'min=30']);
  //validationUtil.setRule('quantity', (value) => value === 0);
  expect(_validationUtil2.default.test()).toBeFalsy();
  //expect(false).toBeFalsy();
});

/*

  handleChange = (path, value) => {
    var error = ValidationUtil.test(path, value);
  }
*/