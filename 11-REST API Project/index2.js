const fs = require('fs')
const express = require('express')
const PORT = 8000
const app = express()
const users = require("./MOCK_DATA.json")

const usersRouter = require("./routes.js")


//Routes

app.get('/users' , (req,res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html)
})    

app.get('/api/users/:id' , (req,res) => {
    const id = req.params.id
    const user = users.find((user) => {user.id === id})
    if(!user) return res.status(404).json({ error: "User not found" });
    else return res.json(user);
    
})

// app.get('./api/users' , (req,res) => {
//     res.setHeader('users-data' , 'json')
//     res.json(users)
// })

// app.post('/api/users' , (req,res) => {
//     const body = req.body
//     const newUser = {...body , id: users.length + 1}
//     users.push(newUser)

//     fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users, null, 2) , (error) => {
//         if(err) return res.status(500).json({error : "Failed to save user"})
//         return res.json({message: 'User Created' , id: newUser.id})
//     })
// })




//or
app.route('/api/users')
   .get((req,res) => {
    return res.json(users)
   })
   .post((req,res) => {
        const body = req.body
    const newUser = {...body , id: users.length + 1}
    users.push(newUser)
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users, null, 2) , (error) => {
        if(err) return res.status(500).json({error : "Failed to save user"})
        return res.json({message: 'User Created' , id: newUser.id})
    })
   })

//or

app.use('/api/users' , usersRouter)








app.listen(PORT, console.log(`Server is running on ${PORT}`))



