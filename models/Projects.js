const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

const TechnoSchema = new mongoose.Schema({
  label: String,
}, { timestamps: true });

const TechnoModel = mongoose.model("Techno", TechnoSchema);

const ProjectsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  image: String,
  lien_github: String,
  lien_github_back: String,
  lien_web: String,
  content: String,
  techno: [{ type: mongoose.Types.ObjectId, ref: "Techno" }],
  comment: [],
  likes: Number,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const ProjectModel = mongoose.model("Project", ProjectsSchema);

module.exports = {
  TechnoModel,
  ProjectModel,
  UserModel,
}
