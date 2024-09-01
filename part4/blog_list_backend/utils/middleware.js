const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");

  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({
    error: "Unknown endpoint",
  });

  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({
      error: "Malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  // return null;

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({
      error: "missing/invalid token",
    });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  let error;
  if (!decodedToken.id) {
    return res.status(401).json({
      error: "invalid/missing token",
    });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(404).json({
      error: "user not found!",
    });
  }

  req.user = user;

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
