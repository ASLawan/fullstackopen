const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

// get token from request
const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

blogRouter.post("/", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;

  // console.log("Here is: ", req.body);

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({
      error: "token invalid",
    });
  }

  // const user = req.user;
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(404).json({
      error: "user not found!",
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const user = req.user;

  if (blog.user.toString() !== user.id) {
    return res.status(403).json({
      error: "not authorized",
    });
  }

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
