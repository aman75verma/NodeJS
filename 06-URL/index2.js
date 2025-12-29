//URl library is used to parse all data eg
//querey params , slashes , hash , https 
//everything and can access them
//eg 'https://example.com:8080/path/name?user=ammu&id=42#section1';

// Url {
//   protocol: 'https:',
//   slashes: true,
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path/name',
//   search: '?user=ammu&id=42',
//   query: 'user=ammu&id=42',
//   hash: '#section1'
// }

// if(req.url !== '/localhost:3000/*') return res.end()

const http = require('http')
const fs = require('fs')
const url = require('url')

const myserver = http.createServer((req,res) => {
    //1.Method Check
    if(req.method !== "GET"){
        res.statusCode = 405
        return res.end("GET REQUESTS ARE ACCEPTED ONLY")
    }   
    
    //2.Setting Header
    res.setHeader("Content-type" , "text/plain")


    //3.Parsing Url
    const myUrl = url.parse(req.url , true)
    console.log(myUrl)
    const {pathname , query} = myUrl //picking from that above json

   //4. Logs
    const log = `${new Date().toLocaleString()} , ${myUrl.pathname} : New Req Rcvd\n`
    fs.appendFile('new_logs.txt' , log , (err)=>{
        if(err) console.error(err)
    })


    //5.One Route One Response
    if(pathname === '/') return res.end("Welcome to Home")
    if(pathname === '/contact') return res.end("ammuaman75@gmail.com")
    if(pathname === '/login'){
        const {username , password} = query //picking from querey json
        if (username === 'ammuaman75' && password === 'aman@123') {
            return res.end(`Hello ${username}, What's up?`);
        } 
        else return res.end("Wrong details")
    }
    res.statusCode = 404;
    res.end("Route not Found")
})


myserver.listen(8000, ()=>console.log("Server Started"))
