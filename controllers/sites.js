const SiteModel = require("../models/Sites");

const SiteController = {
  updateSite(req, res) {
    const idSite = req.params.idSite;
    const { presentation_titre, presentation_sum, footer} = req.body;

    const updateData = {
        presentation_titre,
        presentation_sum,
        footer,
    };
    console.log(idSite, updateData);

    SiteModel.findOneAndUpdate({ _id: idSite }, updateData, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log("Error updateSite", error);
        res.sendStatus(500);
      });
  },
};

module.exports = SiteController;
