// making logs
const fs = require('fs')
const http = require('http')

const myserver = http.createServer((req,res) => {
const log = `${new Date().toLocaleString()}  , ${req.url}: New Request Received\n`;
    fs.appendFile('logs.txt' , log , (err,data) => {
        // res.end("Hello from server")
        // multiroute
        switch(req.url){
            case '/': res.end('HomePage')
            break
            case '/about': res.end("I am anthony gonsalvis")
            break
        }



    })
})

myserver.listen(3000,() => {console.log("server started")})