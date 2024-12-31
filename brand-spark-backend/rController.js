const Client = require("./models/clientSchema");
const Portfolio = require("./models/portfolioSchema");
const uploadToS3 = require("./s3");

const deletePortfolioImage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio Item not found" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting Portfolio Item:", error);
    return res.status(500).json({ message: "Error deleting Portfolio Item" });
  }
};


const uploadClient = async (req, res) => {
  try {
    const { color } = req.body;
    const file = req.file;
    let client;
    if (file) {
      client = await uploadToS3(file);
    }
    const newClient = new Client({
      color,
      clientUrl: client,
    });
    await newClient.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error adding client:", error);
    return res.status(500).json({ message: "Error adding client" });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    if (!clients) {
      return res.status(404).json({ message: "No clients found" });
    }
    res.json(clients);
  } catch (error) {
    console.error("Error getting clients:", error);
    return res.status(500).json({ message: "Error getting clients" });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ message: "Error deleting client" });
  }
};

const uploadPortfolioImages = async (req, res) => {
  try {
    const files = req.files;

    let coverImage, detailsImage;

    if (files.coverImage && files.detailsImage) {
      coverImage = await uploadToS3(files.coverImage[0]);
      detailsImage = await uploadToS3(files.detailsImage[0]);
    } else {
      return res.status(500).json({ message: "Two Images Needed" });
    }
    const newPortfolio = new Portfolio({
      coverImageUrl: coverImage,
      detailsImageUrl: detailsImage,
    });
    await newPortfolio.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

const getPortfolioImages = async (req, res) => {
  try {
    console.log("Getting images");
    const data = await Portfolio.find();
    if (!data) {
      return res.status(404).json({ message: "No images found" });
    }
    console.log(data);
    res.json(data); 
  } catch (error) {
    console.error("Error getting images:", error);
    return res.status(500).json({ message: "Error getting images" });
  }
}

module.exports = {
  uploadClient,
  getClients,
  deleteClient,
  uploadPortfolioImages,
  getPortfolioImages,
  deletePortfolioImage,
};
