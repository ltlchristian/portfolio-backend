const mongoose = require("mongoose");

const CarouselImgSchema = new mongoose.Schema({
  carousel_img: String,
});

const CarouselImgModel = mongoose.model("Carouselimg", CarouselImgSchema);

module.exports = CarouselImgModel;
