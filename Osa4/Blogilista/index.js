const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

app.use(cors());
app.use(bodyParser.json());

/*
  TODO:

  CONFIGURE MONGOURL TO A DATABASE IN MLAB, WILL NOT WORK WITHOUT IT
*/
const mongoUrl =
  "mongodb://Savipulu:TietoKantaSalaSana@ds117178.mlab.com:17178/fullstack-notes";
mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

app.get("/api/blogs", (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => {
      console.log(error);
      response.status(418).end();
    });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(418).end();
    });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
