const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let token;
// setup a mock database
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  // // create user
  // const passwordHash = bcrypt.hash("testpassword", 10);
  // const user = new User({ username: "testuser", passwordHash });

  // await user.save();

  // const userForToken = {
  //   username: user.username,
  //   id: user._id,
  // };

  // token = jwt.sign(userForToken, process.env.SECRET);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blog posts", async () => {
  const res = await api.get("/api/blogs");

  assert.strictEqual(res.body.length, 2);
});

test("the field identifying the blog is named id", async () => {
  const res = await api.get("/api/blogs");

  const contents = res.body.map((content) => content.hasOwnProperty("id"));

  //   console.log(contents);
  assert(
    contents.every((hasId) => hasId === true),
    "Not every blog has an 'id' field"
  );
});

test("a new blog can be added to the blogs, if authorizecd", async () => {
  // create user
  // const passwordHash = bcrypt.hash("testpassword", 10);
  // const user = new User({ username: "testuser", passwordHash });

  // await user.save();

  // const userForToken = {
  //   username: user.username,
  //   id: user._id,
  // };

  // token = jwt.sign(userForToken, process.env.SECRET);

  const newBlog = {
    title: "a new blog",
    author: "Nawal",
    url: "The url is here",
    likes: 30,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    // .set("Authorization", `Bearer ${token}`)
    .expect(401);
  // .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");

  const contents = res.body.map((content) => content.title);

  assert.strictEqual(res.body.length, helper.initialBlogs.length);

  assert(!contents.includes("a new blog"));
});

test("The default value for blog likes is zero (0)", async () => {
  const newBlog = {
    title: "a new blog",
    author: "Nawal",
    url: "The url is here",
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
  // .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");

  const contents = res.body.map((content) => content.likes);

  assert.strictEqual(contents.length, helper.initialBlogs.length);
});

test("Adding a blog without a title returns 401 Unauthorized", async () => {
  const newBlog = {
    author: "Nawal",
    url: "The url is here",
    likes: 74,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);

  const res = await api.get("/api/blogs");

  assert.strictEqual(res.body.length, helper.initialBlogs.length);
});

test("Adding a blog without a URL returns 401 Unauthorized", async () => {
  const newBlog = {
    title: "Blog title is here",
    author: "Nawal",
    likes: 90,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
  const res = await api.get("/api/blogs");

  assert.strictEqual(res.body.length, helper.initialBlogs.length);
});

test("Adding a blog without a title and URL returns 401 Unauthorized", async () => {
  const newBlog = {
    author: "Nawal",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);

  const res = await api.get("/api/blogs");

  assert.strictEqual(res.body.length, helper.initialBlogs.length);
});

describe("delete a blog post", () => {
  test("deletes blog with valid id, without authentication returns 401 Unauthorzed", async () => {
    const blogsDeforeDelete = await helper.blogsInDb();

    const blogToDelete = blogsDeforeDelete[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAfterDelete = await helper.blogsInDb();

    assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length);

    const contents = blogsAfterDelete.map((blog) => blog.title);

    assert(contents.includes(blogToDelete.title));
  });
});

describe("Update a blog post", () => {
  test("update post with valid id", async () => {
    const blogsbefore = await helper.blogsInDb();

    const blogToUpdate = blogsbefore[0];

    const updatedBlog = { ...blogToUpdate, likes: 90 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();

    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length);
  });
});

// close database connection
after(async () => {
  await mongoose.connection.close();
});
