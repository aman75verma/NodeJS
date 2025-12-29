const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = { ...body, id: users.length + 1 };

  users.push(newUser);

  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save user" });
      }
      return res.status(201).json({
        message: "User Created",
        id: newUser.id
      });
    }
  );
});

module.exports = router;
