// making logs
const fs = require('fs')
const http = require('http')

const myserver = http.createServer((req,res) => {
    const log = `${Date.now()} : New Request Received\n`
    fs.appendFile('logs.txt')
    console.log()
    console.log("server started")
    res.end("hii from server")
})