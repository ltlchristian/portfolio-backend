const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  title: String,
  logo: String,
  footer: String,
  presentation_titre: String,
  presentation_sum: String,
  background_img: String,
}, { timestamps: true });

const SiteModel = mongoose.model("Site", SiteSchema);

module.exports = SiteModel;
