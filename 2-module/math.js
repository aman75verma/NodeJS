// function add( a , b){
//     return a + b
// }

// function sub( a , b){
//     return a - b
// }

// // //exporting this private function
// // module.exports = add
// // module.exports = sub //overriding


// // module.exports = {
// //    addFn : add,
// //    subFn : sub 
// // }

// module.exports = {
//    add,
//    sub 
// }


exports.add = (a,b) => a + b;
exports.sub = (a,b) => a - b;