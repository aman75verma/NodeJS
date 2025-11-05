// const derived_fn = require('./math')


// // console.log(derived_fn)
// // console.log(derived_fn(2,3))



// console.log(derived_fn.addFn)
// console.log(derived_fn.addFn(2,3))
// console.log(derived_fn.subFn)
// console.log(derived_fn.subFn(2,3))


// const {addFn, subFn} = require("./math")
// console.log(addFn(2,3))
// console.log(subFn(2,3))


const {add, sub} = require("./math")
console.log(add) //anonymous function as object of exports
console.log(add(2,3))
console.log(sub(2,3))


//some more modules syntax like 
const my_module = require('crypto') // ency-decy
const my_module = require('fs')