const express = require('express');
const app = express();
const PORT = 8000;

const fs = require('fs');
const users = require('./MOCK_DATA.json')
app.use(express.urlencoded({ extended: false }))


//ROUTES
app.get('/users' , (req,res) => {
    const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    return res.send(html)
});

app.get('/api/users' , (req,res) => {
    return res.json(users)
});
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
});

// Create a new user
app.post('/api/users', (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save user" });
        }
        return res.json({ message: 'User created', id: newUser.id });
    });
});
//---------------------------
// app.router('/api/users').get('/api/users' , (req,res) => {
//     return res.json(users)
// }).post('/api/users' , (req,res) => {
//     //todo create a new user
//     return res.json({status : "pending"})
// })


app.listen(PORT , ()=>console.log(`Server is running at http://localhost:${PORT}`))
