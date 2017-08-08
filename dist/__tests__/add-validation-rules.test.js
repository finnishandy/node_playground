'use strict';

var _validationUtil = require('../src/TECH-101/validation-util');

var _validationUtil2 = _interopRequireDefault(_validationUtil);

var _content = require('../__mocks__/content');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = (0, _immutable.fromJS)(_content.mockContent);
_validationUtil2.default.setData(content);

// a rule is one to many relationship, but the identifier can be an Array
test('One should be able to set rule names with an Array', function () {
  var hasToBeDefined = function hasToBeDefined(value) {
    return !!value;
  };
  _validationUtil2.default.setRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired'], hasToBeDefined);
  expect(_validationUtil2.default.getRule(['damageItemDetails', 'contentDetail', 'shouldBeRepaired']).toString()).toEqual(hasToBeDefined.toString());
});

// identifier can be a String
test('One should be able to set rule names with a String', function () {
  var hasToBeDefined = function hasToBeDefined(value) {
    return !!value;
  };
  _validationUtil2.default.setRule('description', hasToBeDefined);
  expect(_validationUtil2.default.getRule('description').toString()).toEqual(hasToBeDefined.toString());
});

// identifier can be a CSV String
test('One should be able to set rule names with a CSV String', function () {
  var hasToBeDefined = function hasToBeDefined(value) {
    return !!value;
  };
  _validationUtil2.default.setRule('damageItemDetails, contentDetail, shouldBeRepaired', hasToBeDefined);
  expect(_validationUtil2.default.getRule('damageItemDetails, contentDetail, shouldBeRepaired').toString()).toEqual(hasToBeDefined.toString());
});

// identifier can be a CSV String
test('One should be able to set rules with an Array', function () {
  var hasToBeDefined = function hasToBeDefined(value) {
    return !!value;
  };
  var hasToBeBiggerThan = function hasToBeBiggerThan(value, num) {
    return value > num;
  };
  _validationUtil2.default.setRule('description', [hasToBeDefined, hasToBeBiggerThan]);
  expect(_validationUtil2.default.getRule('description').length).toEqual(2);
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with no equivalent named function should throw an exception in _mapRules', function () {
  expect(function () {
    _validationUtil2.default._mapRules(['foo']);
  }).toThrow();
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with an array with no equivalent named function should throw an exception', function () {
  expect(function () {
    _validationUtil2.default.setRule('description', ['foo']);
  }).toThrow();
});

// If named function does NOT exist it the function should throw an exception
test('Setting a rule with a String with no equivalent named function should throw an exception', function () {
  expect(function () {
    _validationUtil2.default.setRule('description', 'foo');
  }).toThrow();
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set rule with named function identifier', function () {
  _validationUtil2.default.setRule('description', 'required');
  expect(_validationUtil2.default.getRule('description').length).toEqual(1);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set multiple named rules', function () {
  _validationUtil2.default.setRule('description', 'required, feature');
  expect(_validationUtil2.default.getRule('description').length).toEqual(2);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should be able to set multiple named rules', function () {
  _validationUtil2.default.setRule('description', 'required, feature');
  expect(_validationUtil2.default.getRule('description').length).toEqual(2);
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should pass the test with required rule with fooo value', function () {
  _validationUtil2.default.setRule('description', 'required');
  expect(_validationUtil2.default.test('description')).toBeTruthy();
});

// identifier can be a be a rule String like maxLen=30 || required
test('One should pass the test with required rule and custom function with fooo value', function () {
  _validationUtil2.default.setRule('description', ['required', function (value) {
    console.log('value', value.length > 3);
    return value.length > 3;
  }]);
  expect(_validationUtil2.default.test('description')).toBeTruthy();
});

test('One should pass the test with required rule and custom function with correct values', function () {
  _validationUtil2.default.reset();
  _validationUtil2.default.setRule('description', 'required');
  _validationUtil2.default.setRule('quantity', ['required', function (value) {
    return value >= 0;
  }]);
  _validationUtil2.default.setRule('damageItemDetails, unitPriceDetails, unitPrice', function (value) {
    return value >= 0;
  });
  expect(_validationUtil2.default.test()).toBeTruthy();
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