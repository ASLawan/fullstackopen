const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

//==============================
// ROUTES - CREATE USERs
//==============================

// POST
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }
  if (password.length < 3) {
    return res.status(400).json({
      error: "Password must be at least 3 xters long",
    });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

// GET
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  });

  res.json(users);
});

module.exports = usersRouter;
