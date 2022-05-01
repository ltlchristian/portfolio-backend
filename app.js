var express = require("express");
require("dotenv").config();
require("./db");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const SECRET = "my-amazing-secret";

var indexRouter = require("./routes/index");
const projectsRouter = require("./routes/projects");
const authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/projects", projectsRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
