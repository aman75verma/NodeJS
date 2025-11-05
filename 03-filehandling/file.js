const fs = require('fs')
//Write file

//sync call
fs.writeFileSync('./test.txt' , "hey There")
//async
fs.writeFile('./test.txt' , "Hello World async" , (err) =>{})

//blocking and nonblocking execution


//Read file
//sync
const res = fs.readFileSync('./contacts.txt' , 'utf-8')
console.log(res)
//async
const my = fs.readFile('./contacts.txt' , 'utf-8' , (err,result) => {
    if(err) console.log("Error" , err)
        else console.log(result)
})



//Append (for loggings)
fs.appendFileSync('./contacts.txt' , `\nHey There`)
fs.appendFileSync('./contacts.txt' , new Date().getDate().toLocaleString())

//copy fule , delete file (unlink),statistics..lot of funtion 
const fs = require('fs')
fs.mkdirSync('my-docss/a/b' , {recursive : true })