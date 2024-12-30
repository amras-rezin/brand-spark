const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config()
const path = require('path');

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxAttempts: 5, 
  requestTimeout: 300000, 
  socketTimeout: 300000, 
  connectionTimeout: 300000,
});

async function uploadToS3(file) {
  const filename = `${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    console.log(`Uploading file ${filename} to S3...`);
    const data = await s3.send(command);
    console.log(`File uploaded successfully: ${data.Location}`);
    return filename;  
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    if (error.$fault === 'client') {
      console.error('Client-side error, possibly caused by incorrect credentials or file size.');
    }
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
}

module.exports = uploadToS3;
