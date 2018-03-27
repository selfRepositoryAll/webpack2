import 'minireset.css';

//  引入一个js
var moment = require('moment');
// console.log('>>>>>>>>>>>>>');
var time = moment().format();
console.log(time);
// console.log(moment().format());
// const _ = require('ramda')
// setTimeout(() => {
//     console.log('xxxx')
// })
// Array.prototype.unqiue = function () {
//     var ary = []
//     console.log('yangchongduo')
// }
//
// var double = x => x * 2;
//
// var data = _.map(double, [1, 2, 3]); //=> [2, 4, 6]
//
// _.map(double, { x: 1, y: 2, z: 3 })
// console.log('data', data);

// import Vue form './1.vue'
console.log('222');

const {fn} = require('./index2.js')
setTimeout(()=>{
	fn()
},1000)
console.log(moment().format());
setTimeout(()=>{
    console.log('xxxx')
})
Array.prototype.unqiue=function(){
    var ary=[];
    setTimeout(()=>{
        console.log('yangchongduo')
    })
}