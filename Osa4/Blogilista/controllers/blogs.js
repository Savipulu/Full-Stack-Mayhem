const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => {
      console.log(error);
      response.status(418).end();
    });
});

blogsRouter.post("/", (request, response) => {
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

module.exports = blogsRouter;
