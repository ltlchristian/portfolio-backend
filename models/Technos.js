const mongoose = require("mongoose");

const TechnosSchema = new mongoose.Schema({
  label: String,
});

const TechnosModel = mongoose.model("Technos", TechnosSchema);

module.exports = TechnosModel;
