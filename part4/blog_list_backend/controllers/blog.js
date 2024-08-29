const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  await Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  const savedBlog = await blog.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const blogToUpdate = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  res.json(blogToUpdate);
});

module.exports = blogRouter;
