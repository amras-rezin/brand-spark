const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const nodemailer = require('nodemailer');
const connectDB = require('./db');
const upload = require('./multer');
const uploadToS3 = require('./s3');
const Video = require('./models/videoSchema');
const { test } = require('./rController');

const sendMail = async (text) => {
  try {
    const transaction = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: process.env.NODEMAILER_COMPANY_EMAIL,
      subject: 'New Contact Form Submission from Brand Spark',
      text: text,
    };

    await transaction.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

connectDB()

app.get('/api/test', test);
app.get('/api/test1', test);
app.get('/api/test2', test);
app.get('/api/test3', test);
app.get('/api/test4', test);
app.get('/api/test5', test);

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (email === adminEmail && password === adminPassword) {
    try {
      const token = jwt.sign({ id: new ObjectId() }, 'brand+spark1admin', {
        expiresIn: '3d',
      });
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

app.post('/api/contact', async (req, res) => {
  const {
    name,
    organization,
    email,
    contact,
    website,
    services,
    budget,
    source,
  } = req.body;
  console.log('Contact form submitted:', req.body);

  if (!name || !organization || !email || !contact) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  try {
    const text = `
Inquiry Details :

• Name: ${name}
• Organization: ${organization}
• Email: ${email}
• Contact: ${contact}

Additional Information :

🔗 Website/Social Media: ${website || 'Not provided'}
📋 Services Interested In: ${
      services.length ? services.join(', ') : 'No services selected'
    }
💰 Budget Range: ${budget || 'Not specified'}
📣 Heard About Us From: ${source || 'Not specified'}

---
Thank you ! 
`;

    await sendMail(text);
    res.status(200).json({
      message: 'Form submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

app.post('/api/uploadVideo',upload.single('video'), async (req, res) => {
  const file = req.file
  let video;
  if (file) {
    const smallFile = {
      originalname: 'test.txt',
      buffer: Buffer.from('Hello world!'),
      mimetype: 'text/plain',
    };
    await uploadToS3(smallFile);
  }
  // const newVideo = new Video({
  //   filePath: video,
  // });
  try {
    // await newVideo.save();
    res.status(200).json({message: 'success'});
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
