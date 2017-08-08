'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ValidationUtil should return boolean value just for the button...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       use Array every() type of structure;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ok so I have an object with keys which is always csv.. then we use getIn.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Rules object:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       'description': (value) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         return false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       'damageItemDetails, contentDetail, repairCost': fn()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _ramda = require('ramda');

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vRequired = function vRequired(value) {
  return !!value;
};

var vMinNumber = function vMinNumber(value, min) {
  return value > min;
};

var validationFunctions = {
  required: vRequired,
  feature: vMinNumber
};

var defaultValidation = function defaultValidation(name) {
  return validationFunctions[name] || validationFunctions.call(argumentBuilder(name));
};

var argumentBuilder = function argumentBuilder(name) {
  return name.split('=');
};

var ValidationUtil = function () {
  function ValidationUtil() {
    _classCallCheck(this, ValidationUtil);

    this.rules = {};
    this.data = {};
  }

  _createClass(ValidationUtil, [{
    key: 'validateField',
    value: function validateField(name, value) {
      return validationFunctions[name] || validationFunctions.call(argumentBuilder(name));
    }

    // this function is supposed to give a list of error messages

  }, {
    key: 'validate',
    value: function validate(data) {
      return true;
    }

    // this function should/does assume that the data is in Immutable form

  }, {
    key: 'setData',
    value: function setData(data) {
      // convert to Immutable if not
      this.data = data;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.rules = {};
    }
  }, {
    key: 'test',
    value: function test(key) {
      var _this = this;

      var result = true;
      var rules = this.rules;
      var data = this.data;
      if (key) {
        result = rules[key].every(function (rule) {
          return rule(data.getIn(key.split(',')));
        });
      } else {
        result = Object.keys(rules).every(function (_key, idx) {
          var _result = false;
          var csvKey = _this._getCSVKey(_key);
          var _rules = _this._getRules(_key);
          var _data = data.getIn(csvKey);
          if (Array.isArray(_rules)) {
            // multiple rules
            _result = _rules.every(function (rule, ruleIdx) {
              return rule(_data);
            });
          } else {
            // should be single function now
            _result = _rules(_data);
          }
          return _result;
        });
      }
      return result;
    }
  }, {
    key: '_getCSVKey',
    value: function _getCSVKey(key) {
      return key.split(",").map(function (item) {
        return item.trim();
      });
    }
  }, {
    key: '_getRules',
    value: function _getRules(key) {
      return this.rules[key];
    }
  }, {
    key: 'getData',
    value: function getData(key) {
      return '';
    }
  }, {
    key: 'getNamedFunction',
    value: function getNamedFunction(name) {
      var rule = validationFunctions[name.trim()]; // TODO: parsing
      // console.log('rule on getNamedFunction', rule);
      if (rule === undefined) throw 'No rule with name ' + name + ' found';
      return rule;
    }
  }, {
    key: 'setRule',
    value: function setRule(key, rule) {
      var csvKey = this._setKey(key);
      this.rules[csvKey] = this._setRule(rule);
      return this;
    }

    // we need to process the rules here, that we have array of functions
    // instead of string.

  }, {
    key: '_setRule',
    value: function _setRule(rule) {
      if (typeof rule === "function") return rule; // could be [].push(rule) so all the rules
      var _rule = Array.isArray(rule) ? rule : rule.split(',');
      var rules = this._mapRules(_rule);
      return rules;
    }

    // Should be an array at this point

  }, {
    key: '_mapRules',
    value: function _mapRules(rules) {
      var _this2 = this;

      var _rules = rules.map(function (rule) {
        return typeof rule === "function" ? rule : _this2.getNamedFunction(rule);
      });
      return _rules;
    }
  }, {
    key: '_setKey',
    value: function _setKey(key) {
      return Array.isArray(key) ? key.join() : key;
    }
  }, {
    key: 'getRule',
    value: function getRule(key) {
      return Array.isArray(key) ? this.rules[key.join()] : this.rules[key];
    }
  }]);

  return ValidationUtil;
}();

exports.default = new ValidationUtil();