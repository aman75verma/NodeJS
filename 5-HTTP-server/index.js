const http = require('http')
const myserver = http.createServer(((req,res)=> {
    console.log("New Req Rcvd")
    console.log(req.headers)
    console.log(req)
    res.end("Hello from Server")
}))

myserver.listen(8000,() => {console.log("server started")})