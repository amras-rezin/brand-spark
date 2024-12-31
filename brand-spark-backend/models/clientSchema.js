const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;