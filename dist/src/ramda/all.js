'use strict';

var _ramda = require('ramda');

var equals3 = (0, _ramda.equals)(3);
console.log((0, _ramda.all)(equals3)([3, 3, 3, 3])); //=> true
console.log((0, _ramda.all)(equals3)([3, 3, 1, 3])); //=> false