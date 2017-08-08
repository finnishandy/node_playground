import {all, equals} from 'ramda';

var equals3 = equals(3);
console.log(all(equals3)([3, 3, 3, 3])); //=> true
console.log(all(equals3)([3, 3, 1, 3])); //=> false
