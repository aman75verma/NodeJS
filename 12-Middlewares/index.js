const express = require('express');
const fs = require('fs')
const app = express();
const PORT = 8000;

app.use((req,res,next ) => {
    fs.appendFile('logs.txt' , `${new Date().toLocaleString()} : ${req.method} : ${req.path}\n` , (err,data) => {
        console.log("log created")
        next();
    })

})

app.use((req,res,next) => {
    console.log('Hello from middleware 1')
    //should return or pass to next middleware/route
    //dont hold


    //eg --for ending cycle
    // res.end()

    //eg -- for passing to next route/middleware
    next()

})

app.use((req,res,next) => {
    console.log('Hello from middleware 2')
    // res.json({ ammu : 'ammu'})  wrong
    // return res.end('Hey')
    next()
    
})


//manipulating req using middlewares

app.use((req,res,next) => {
    console.log('Hello from middleware 2')
    req.name = 'Aman Verma'
    console.log(req.name)
    next()
})


app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  console.log('Query param:', req.query.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})


app.get('/aman' , (req,res) => {
   return res.end("Hey youre at get req thanks")
})

app.listen(PORT , () => {
    console.log(`Server s running on ${PORT}`)
})