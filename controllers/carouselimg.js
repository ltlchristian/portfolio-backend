const CarouselImgModel = require("../models/CarouselImg");

const CarouselImgController = {
  getCarouselImg(req, res) {
    CarouselImgModel.find().then((carousels) => {
      if (carousels.length > 0) res.send(carousels);
      else {
        //On créé les documents pour le carousel
        res.sendStatus(400);
      }
    });
  },

  createCarouselImg(req, res) {
    console.log("==========> createCarouselImg");
    const { title, carousel_img } = req.body;

    CarouselImgModel.create({ title, carousel_img })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },
};

module.exports = CarouselImgController;
