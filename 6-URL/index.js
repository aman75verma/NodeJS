const http = require('http')
const fs = require('fs')
const url = require('url')

const myserver = http.createServer((req,res) => {
    // const myUrl = url.parse(req.url)
    const myUrl = url.parse(req.url , true)
    if(req.url === '/favicon.ico') return res.end()
    // const log = `${new Date().toLocaleString()} , ${req.url} : New Request Received\n`
    const log = `${new Date().toLocaleString()} , ${myUrl.pathname} : New Request Received\n`
    console.log(myUrl)
    fs.appendFile('./logs.txt' , log , (err,data) => {
        // switch(req.url){
        switch(myUrl.pathname){
            case '/':
                res.end('HomePage')
                break
            case '/ContactUs':
                res.end("ammuaman75@gmail.com")
                break
            case '/login':
                const username = myUrl.query.USERNAME
                const password = myUrl.query.PASSWORD
                if(username === 'ammuaman75' && password === 'Tonystark@mark5') res.end(`Hello ${username}, What's up`)
                // else console.log("WRONG PASSWORD DEAR.. TRY")
                else res.end("WRONG PASSWORD DEAR.. TRY")
                break
            default:
                res.end("404")
        }

    })
})

myserver.listen(8000, ()=>console.log("Server Started"))



// now according to this setup http will not parse if you pass query_params and
// log it and also will show 404
// so next
// install npm url(library) which parse accordingly


//now after parsing .. i will use my switch case over myUrl.pathname 