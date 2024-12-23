const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
};
app.use(cors(corsOptions));


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (email === adminEmail && password === adminPassword) {
    try {
      const token = jwt.sign({ id: new ObjectId() }, 'brand+spark1admin', { expiresIn: '3d' });
      res.status(200).json({
        message: 'Success',
        name: adminEmail,
        token,
      });
    } catch (error) {
      console.error('Error creating token:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  } else {
    res.status(401).json({
      message: 'Invalid Credentials',
    });
  }
});

app.post('/api/uploadVideo', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (email === adminEmail && password === adminPassword) {
    try {
      const token = jwt.sign({ id: new ObjectId() }, 'brand+spark1admin', { expiresIn: '3d' });
      res.status(200).json({
        message: 'Success',
        name: adminEmail,
        token,
      });
    } catch (error) {
      console.error('Error creating token:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  } else {
    res.status(401).json({
      message: 'Invalid Credentials',
    });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
