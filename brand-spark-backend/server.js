const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

const users = [
  {
    email: 'admin@example.com',
    password: 'password123',
  },
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful', user });
  } else {
    console.log('Invalid email or password');
    res.status(400).json({ message: 'Invalid email or password' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
