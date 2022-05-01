const TechnosModel = require("../models/Technos");

const TechnosController = {
    getTecnos(req, res) {
        TechnosModel.find().then((technos) => {
        if (technos.length > 0) res.send(technos);
        else {
            //On créé les documents pour les technos
            res.sendStatus(400);
        }
        });
    },

    createTecnos(req, res) {
        console.log("==========> createTecnos");
        const { label } = req.body;

        TechnosModel.create({ label })
          .then(() => {
            res.sendStatus(201);
          })
          .catch(() => res.sendStatus(500));
    },
};



module.exports = TechnosController;
