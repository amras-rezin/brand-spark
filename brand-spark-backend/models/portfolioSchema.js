const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  coverImageUrl: {
    type: String,
    required: true,
  },
  detailsImageUrl: {
    type: String,
    required: true,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
