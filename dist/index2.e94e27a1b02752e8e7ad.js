webpackJsonp([1],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(64)
var moment = __webpack_require__(1);
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

/***/ })

},[239]);