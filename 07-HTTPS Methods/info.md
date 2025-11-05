# HTTPS METHODS
---

## 1.GET
- used to retrieve some data from server without modifying anything on server
- No request body
- Response body (HTML, JSON)
- Does not change server state
- ```js
  app.get('/users', (req, res) => {
    const users = ['Ammu', 'John', 'Sara'];
    res.json(users);
  });
  ```

---

## 2.POST
- used to add some data in database and some querey
- request body (JSON,form data,file etc)
- response body(usually a confirmation)

### Frontend JS
- ```js
  fetch('https://api.example.com/users' , {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body: JSON.stringify({name: "Ammu" , email :'ammuaman75@gmai.com' })
  }).then(res => res.json()).then(data => console.log(data));
  ```

### Backend(ExpressJs)
- ```js
  app.post('/users' , (req,res) => {
    const user = req.body
    console.log(user)
    res.status(201).json({message : 'User Created' , data : user})
  })
  ```

--- 

## 3.PUT 
- full update (needs full req body to update resource)
- ```js
  app.put('/users/:id' , (req,res) => {
    const id = req.params.id
    //some db update
    const updatedUser = req.body
    res.json({message : `User ${id} replaced` , data:updatedUser})
  })
  ```
- if you send partial data, the missing fields might get overwritten (replaced with null or default).

--- 
## 4.Patch
- partial update
- ```js
  app.patch('/users/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  res.json({ message: `User ${id} updated`, updates });
  });
  ```
---

## 5.Delete
- ```js
  app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `User ${id} deleted` });
  });
  ```


