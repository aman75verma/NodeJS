// making logs
// const fs = require('fs')
// const http = require('http')

// const myserver = http.createServer((req,res) => {
// const log = `${new Date().toLocaleString()}  , ${req.url}: New Request Received\n`;
//     fs.appendFile('logs.txt' , log , (err,data) => {
//         // res.end("Hello from server")
//         // multiroute
//         switch(req.url){
//             case '/': res.end('HomePage')
//             break
//             case '/about': res.end("I am anthony gonsalvis")
//             break
//         }



//     })
// })

// myserver.listen(3000,() => {console.log("server started")})


//console.log()  → terminal (server-side)
// res.end()      → browser (client-side)


const fs = require('fs')
const http = require('http')
const phn = +916396173824

//1.Log Date and Url
//2.Set headers
//3.Check get method
//4.route handling
//5.end response

const myserver = http.createServer((req,res) => {
    
    //1
    const log = `${new Date().toLocaleString()} , ${req.url}: New Request Received\n`
    fs.appendFile("logs_2.txt" , log , (err)=>{
    if(err) console.error("Error Found" , err)
    })

    //2
    res.setHeader("Content-Type" , "text/plain")
    
    //3
    if(req.method !== "GET"){
        res.statusCode = 405
        return res.end("Method not allowed")
    }

    //4
    res.write("Hello from Server\n")
    switch(req.url){
        case '/':
            res.write("You are at home")
            break
        case '/contact':
            res.write(`Call at ${phn}`)
            break
        default:
            res.statusCode = 404
            res.write("Page not Found")
        }
    return res.end("\nGoodBye")
})

myserver.listen(3000,() => {console.log("server started")})