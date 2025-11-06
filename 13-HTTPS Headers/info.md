app.get('/api/users' , (req,res) => {
    res.setHeader('x-myname' , 'AmanVerma')
    return res.json(users)
});

for the particular api endpoint

eg seding a form from postman to post endpoint
so it will send a header
content type ---> application/json