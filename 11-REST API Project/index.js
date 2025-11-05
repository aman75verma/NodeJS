const express = require('express');
const app = express();
const PORT = 8000;

const users = require('./MOCK_DATA.json')


//ROUTES
app.get('/users' , (req,res) => {
    const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}<li>`).join('')}
    </ul>
    `
    return res.send(html)
});

app.get('/api/users' , (req,res) => {
    return res.json(users)
});

app.get('/api/users/:id' , (req,res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
});


app.post('/api/users' , (req,res) => {
    //todo create a new user
    return res.json({status : "pending"})
})


//---------------------------
app.route('/api/users').get('/api/users' , (req,res) => {
    return res.json(users)
}).post('/api/users' , (req,res) => {
    //todo create a new user
    return res.json({status : "pending"})
})


app.listen(PORT , ()=>console.log(`Server is running on ${PORT}`))
