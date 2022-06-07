const { ProjectModel } = require("../models/Projects");

const projectController = {
  getProjects(req, res) {
    const title = req.query.title;
    const query = title === "" ? {} : {title:{'$regex' : `^${title}`, '$options' : 'i'}};    
    ProjectModel.find(query)
      .populate("techno")
      .then((projectsList) => {
        res.send(projectsList);
      });
  },

  getProject(req, res) {
    const idProject = req.params.idProject;
    ProjectModel.findById(idProject)
      .populate("techno")
      .then((project) => {
        res.send(project);
      });
  },

  addLikes(req, res) {
    const idProject = req.params.idProject;
    ProjectModel.findOneAndUpdate(
      { _id: idProject },
      { $inc: { likes: 1 } },
      { new: true }
    ).then((result) => {
      res.send(result);
    });
  },

  createProject(req, res) {
    const {
      title,
      summary,
      image,
      lien_github,
      lien_web,
      content,
      techno,
      likes = 0,
    } = req.body;
    const user = req.user;

    ProjectModel.create({
      title,
      summary,
      image,
      lien_github,
      lien_web,
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

    const query = title === "All" ? {} : {title:{'$regex' : `^${title}`, '$options' : 'i'}};
    ProjectModel.find(query)
      .populate("techno")
      .then((projectsList) => {
        res.send(projectsList);
      });
  },

  deleteProject(req, res) {
    const idProject = req.params.idProject;
    ProjectModel.findByIdAndRemove(idProject)
      .then((result) => {
        res.send("project removed");
      })
      .catch((error) => {
        console.log("Error deleteProject", error);
        res.sendStatus(500);
      });
  },

  updateProject(req, res) {
    const idProject = req.params.idProject;
    const { title, summary, image, lien_github, content, techno } = req.body;
    const user = req.user;

    const updateData = {
      title,
      summary,
      image,
      lien_github,
      content,
      techno,
      user: user.id,
    };
    ProjectModel.findOneAndUpdate({ _id: idProject }, updateData, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log("Error updateProject", error);
        res.sendStatus(500);
      });
  },
};

module.exports = projectController;
