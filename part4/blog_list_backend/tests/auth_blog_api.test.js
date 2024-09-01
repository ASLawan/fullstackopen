const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // your Express app
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let token;

beforeEach(async () => {
  // Clear the database
  await User.deleteMany({});
  await Blog.deleteMany({});

  // Create a test user
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({ username: "testuser", passwordHash });

  await user.save();

  // Generate a token for the test user
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);
});

describe("POST /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "John Doe",
      url: "http://testblog.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.length, 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(titles.includes("Test Blog"));
  });

  test("a new blog can be added to the blogs, if authorizecd", async () => {
    const newBlog = {
      title: "a new blog",
      author: "Nawal",
      url: "The url is here",
      likes: 30,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");

    const contents = res.body.map((content) => content.title);

    assert.strictEqual(res.body.length, 1);

    assert(contents.includes("a new blog"));
  });

  test("The default value for blog likes is zero (0)", async () => {
    const newBlog = {
      title: "a new blog",
      author: "Nawal",
      url: "The url is here",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");

    const contents = res.body.map((content) => content.likes);

    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(contents[contents.length - 1], 0);
  });

  test("Adding a blog without a title returns 400 Bad Request", async () => {
    const newBlog = {
      author: "Nawal",
      url: "The url is here",
      likes: 74,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, 0);
  });

  test("Adding a blog without a URL returns 400 Bad Request", async () => {
    const newBlog = {
      title: "Blog title is here",
      author: "Nawal",
      likes: 90,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, 0);
  });

  test("Adding a blog without a title and URL returns 400 Bad Request", async () => {
    const newBlog = {
      author: "Nawal",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, 0);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("a blog can be deleted", async () => {
    // First, create a new blog
    const newBlog = new Blog({
      title: "Blog to be deleted",
      author: "John Doe",
      url: "http://deleteblog.com",
      likes: 5,
      user: (await User.findOne({ username: "testuser" }))._id,
    });
    await newBlog.save();

    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `Bearer ${token}`) // Include the token here
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

after(async () => {
  await mongoose.connection.close();
});
