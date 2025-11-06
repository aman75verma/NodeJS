# Middlewares
- functions having access of next middleware , req object and res object 
- can execute any code (has code block inside)
- can make changes to req and res
- can end the req res cycle 
- can call the next middleware function in stack

---
## Middlewares on a URL PATH
- ```js
   app.use('/user/:id' , (req,res,next) => {
    console.log("Request type , req.method")
   })
  ```

---
## Middlewares on APIendpoints
- ```js
   app.get('/user/:id' , (req,res,next) => {
    console.log("Request type , req.method")
   })
  ```
---
## Serial Mount
- ```js
   app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
  }, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
  })
  ```