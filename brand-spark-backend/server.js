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
const { deletePortfolioImage, uploadClient, getClients, deleteClient, uploadPortfolioImages, getPortfolioImages } = require('./rController');
const Service = require('./models/serviceSchema');

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
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

connectDB();

app.post('/api/uploadClient', upload.single('image'),uploadClient);
app.get('/api/clients', getClients);
app.delete('/api/deleteClient/:id', deleteClient);
app.post('/api/uploadPortfolioImages', upload.fields([{ name: 'coverImage', maxCount: 1 },{ name: 'detailsImage', maxCount: 1 }]), uploadPortfolioImages);
app.get('/api/portfolioManagement', getPortfolioImages);
app.delete('/api/portfolioManagement/:id', deletePortfolioImage);

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

app.post('/api/uploadVideo', upload.single('video'), async (req, res) => {
  const file = req.file;
  let video;
  if (file) {
    video = await uploadToS3(file);
  }
  const newVideo = new Video({
    filePath: video,
  });
  try {
    await newVideo.save();
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

app.get('/api/getVideo', async (req, res) => {
  const videos = await Video.find();
  if (!videos) {
    return res.status(404).json({ message: 'No videos found' });
  }
  res.json(videos);
});

app.post('/api/selectVideo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Video.updateMany({}, { $set: { selected: false } });
    const updatedVideo = await Video.findByIdAndUpdate(id, {
      $set: { selected: true },
    });
    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getSelectedVideo', async (req, res) => {
  try {
    const selectedVideo = await Video.findOne({ selected: true });
    if (!selectedVideo) {
      return res.status(404).json({ message: 'No selected video found' });
    }
    res.status(200).json(selectedVideo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/addService', upload.single('icon'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    let icon;
    if (file) {
      icon = await uploadToS3(file);
    }
    const newService = new Service({
      title,
      description,
      iconUrl: icon,
    });
    await newService.save();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({ message: 'Error adding service' });
  }
});

app.get('/api/getService', async (req, res) => {
  try {
    const service = await Service.find();
    if (!service) {
      return res.status(404).json({ message: 'No videos found' });
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/deleteService/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
