const { ProjectModel } = require("../models/Projects");

const projectController = {
  getProjects(req, res) {
    console.log("==========> getProjects");
    const title = req.query.title;
    const query = title === "" ? {} : {title:{'$regex' : `^${title}`, '$options' : 'i'}};    
    console.log(query);
    ProjectModel.find(query)
      .populate("techno")
      .then((projectsList) => {
        res.send(projectsList);
      });
  },

  getProject(req, res) {
    console.log("==========> getProject");
    const idProject = req.params.idProject;
    ProjectModel.findById(idProject)
      .populate("techno")
      .then((project) => {
        res.send(project);
      });
  },

  addLikes(req, res) {
    console.log("==========> addLikes");
    const idProject = req.params.idProject;
    ProjectModel.findOneAndUpdate(
      { _id: idProject },
      { $inc: { likes: 1 } },
      { new: true }
    ).then((result) => {
      console.log(result);
      res.send(result);
    });
  },

  createProject(req, res) {
    console.log("==========> createProject");
    const {
      title,
      summary,
      image,
      lien_github,
      content,
      techno,
      likes = 0,
    } = req.body;
    const user = req.user;

    console.log(
      title,
      summary,
      image,
      lien_github,
      content,
      techno,
      likes,
      user
    );
    ProjectModel.create({
      title,
      summary,
      image,
      lien_github,
      content,
      techno,
      likes,
      user: user.id,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },

  searchByTitle(req, res) {
    const title = req.params.title;
    console.log("searchByTitle", title);

    const query = title === "All" ? {} : {title:{'$regex' : `^${title}`, '$options' : 'i'}};
    ProjectModel.find(query)
      .populate("techno")
      .then((projectsList) => {
        res.send(projectsList);
      });
  },
};

module.exports = projectController;
