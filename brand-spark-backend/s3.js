const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(file) {
  const uniqueID = uuidv4();
  const fileExtension = path.extname(file.originalname);
  const filename = `${uniqueID}${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);
    return params.Key;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error(error.message);
  }
}

module.exports = uploadToS3;
