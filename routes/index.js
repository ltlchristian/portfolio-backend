var express = require("express");
const TechnosController = require("../controllers/technos");
var router = express.Router();

const SiteModel = require("../models/Sites");
const SiteController = require("../controllers/sites")

const dataSite = {
  title: "Christian Ly",
  logo: "devimg.jpg",
  footer: "Christian Ly - 2022",
  presentation_titre: "Développeur FullStack Js",
  presentation_sum: "Bienvenus sur mon portfolio et découvrez quelques projets qui ont été réalisés pendant la formation fullstack javascript",
  background_img: "backgroundsite.jpg"
};

/* GET home page. */
router.get("/", function (req, res) {
  res.send("hello from API");
});

router.get("/sites/:id", function (req, res) {
  SiteModel.findById(req.params.id).then((site) => {
    res.json(site);
  });
});

router.delete("/sites/:id", function (req, res) {
  const idSite = req.params.id;
  SiteModel.findByIdAndRemove(idSite)
    .then((result) => {
      res.send("site supprimé");
    });
});

router.get("/sites", function (req, res) {
  SiteModel.find().then((site) => {
    if (site.length > 0) res.json(site[0]);
    else {
      //On créé les documents pour le site
      SiteModel.create(dataSite)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch(() => res.sendStatus(500));
    }
  });
});

router.get("/technos", TechnosController.getTecnos);
router.post("/technos", TechnosController.createTecnos);

router.post("/sites/:idSite", SiteController.updateSite);

module.exports = router;
