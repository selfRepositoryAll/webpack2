const R = require('ramda')
var moment = require('moment');
// console.log('>>>>>>>>>>>>>');
var time = moment().format();
console.log(time);
var equals3 = R.equals(3);
console.log(R.all(equals3)([3, 3, 3, 3]));  //=> true
const flag = R.all(equals3)([3, 3, 1, 3]); //=> false
console.log(flag);
const fn = () => {
  return R.always('Tee')
}
module.exports = {
  fn
}