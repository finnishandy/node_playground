import {all, compose, props} from 'ramda';
import {isImmutable, fromJS} from 'immutable';

const vRequired = (value) => {
  return !!value;
};

const vMinNumber = (value, min) => {
  return value > min;
};


const validationFunctions = {
  required: vRequired,
  feature: vMinNumber
};

const defaultValidation = (name) => {
  return validationFunctions[name] || validationFunctions.call(argumentBuilder(name));
};

// Draft of string manipulator or external library call
const argumentBuilder = (name) => {
  return name.split('=');
};

class ValidationUtil {
  constructor() {
    this.rules = {};
    this.data = {};
  }

  validateField(name, value) {
    return validationFunctions[name] || validationFunctions.call(argumentBuilder(name));
  }

  // this function is supposed to give a list of error messages
  validate(data) {
    return true;
  }

  // this function should/does assume that the data is in Immutable form
  setData(data) {
    // convert to Immutable if not
    this.data = data;
  }

  reset() {
    this.rules = {};
  }

  // TODO: refactor the code...
  test(key) {
    let result = true;
    let rules = this.rules;
    let data = this.data;
    if (key) {
       result = rules[key].every(rule => {
         return rule(data.getIn(key.split(',')));
       })
    } else {
      result = Object.keys(rules).every((_key, idx) => {
        let _result = false;
        let csvKey = this._getCSVKey(_key);
        let _rules = this._getRules(_key);
        let _data = data.getIn(csvKey);
        if (Array.isArray(_rules)) { // multiple rules
          _result = _rules.every((rule, ruleIdx) => {
            return rule(_data);
          });
        } else { // should be single function now
          _result = _rules(_data);
        }
        return _result;
      });
    }
    return result;
  }

  _getCSVKey(key) { // had a problem with some extra spaces..
    return key.split(",").map(function(item) {
      return item.trim();
    });
  }

  _getRules(key) {
    return this.rules[key];
  }

  getNamedFunction(name) {
    let rule = validationFunctions[name.trim()]; // TODO: parsing
    if (rule === undefined) throw 'No rule with name ' + name + ' found';
    return rule;
  }

  setRule(key, rule) {
    let csvKey = this._setKey(key);
    this.rules[csvKey] = this._setRule(rule);
    return this;
  }

  // we need to process the rules here, that we have array of functions
  // instead of string.
  _setRule(rule) {
    if (typeof rule === "function") return rule; // could be [].push(rule) so all the rules
    let _rule = Array.isArray(rule) ? rule : rule.split(',');
    let rules = this._mapRules(_rule);
    return rules;
  }

  // Should be an array at this point
  _mapRules(rules) {
    let _rules = rules.map(rule => {
      return (typeof rule === "function") ? rule :
        this.getNamedFunction(rule);
    });
    return _rules;
  }


  _setKey(key) {
    return Array.isArray(key) ? key.join() : key;
  }


  getRule(key) {
    return Array.isArray(key) ? this.rules[key.join()] : this.rules[key];
  }
}

export default new ValidationUtil();
