const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const helper = require("../tests/test_helper");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("Ensure valid user creation", () => {
  test("Adding a user without username returns 400 Bad Request", async () => {
    const newUser = {
      name: "Echo Capwell",
      password: "capwell",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const res = await api.get("/api/users");

    assert.strictEqual(res.body.length, helper.initialUsers.length);
  });

  test("Adding a user without a password returns 400 Bad Request", async () => {
    const newUser = {
      username: "capwell",
      name: "Echo Capwell",
    };

    await api.post("/api/users").send(newUser).expect(400);
    const res = await api.get("/api/users");

    assert.strictEqual(res.body.length, helper.initialUsers.length);
  });

  test("Duplicate usernames cannot be created", async () => {
    const newUser = {
      username: "austin",
      name: "Sewoyebaa Austin",
      password: "Sewoyebaa",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const results = await api.get("/api/users");

    assert.strictEqual(results.body.length, helper.initialUsers.length);
  });
});

describe("Valid password and username length", () => {
  test("Username less than 3 xters long returns a 400 Bad Request", async () => {
    const newUser = {
      username: "la",
      name: "Lawan Austin",
      password: "lawanaustin",
    };

    await api.post("/api/users").send(newUser).expect(400);
    const results = await api.get("/api/users");

    assert.strictEqual(results.body.length, helper.initialBlogs.length);
  });

  test("Password less than 3 xters long returns a 400 Bad Request", async () => {
    const newUser = {
      username: "lawan",
      name: "Lawan Austin",
      password: "la",
    };

    await api.post("/api/users").send(newUser).expect(400);
    const results = await api.get("/api/users");

    assert.strictEqual(results.body.length, helper.initialBlogs.length);
  });
});

// close database connection
after(async () => {
  await mongoose.connection.close();
});
