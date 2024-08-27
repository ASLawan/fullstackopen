const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

test("Say hi to Austin", () => {
  const name = "Austin";

  const result = listHelper.sayHi(name);

  assert.strictEqual(result, "Hi, Austin");
});
