// generally 4 threads. what if all 4 are occupied
// the process will be blocked right
// hence writing blocking codes isnt a good practice

// max? machine to machine  
// eg 8v core cpu - 8threads

const os = require('os')
console.log(os.cpus().length)


const fs = require('fs')

//blocking
fs.writeFileSync('./sample_sync.txt', 'Hello Love , This is a Sync File')

//non-blocking
fs.writeFile("./sample_async.txt" , "This one is async" , (err) => {})


//blocking(read)

console.log('1')
const fs = require('fs')
console.log(fs.readFileSync('./sample_sync.txt' , 'utf-8'))
console.log('2')

// 1
// Hello Love , This is a Sync File
// 2


//non blocking
console.log('1')
const fs = require('fs')
fs.readFile('./sample_async.txt' , 'utf-8' , (err,result) => {
    console.log(result)
})

console.log('2')

// 1
// 2
// This one is async
