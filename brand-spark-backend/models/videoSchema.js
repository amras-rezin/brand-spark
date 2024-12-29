const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
