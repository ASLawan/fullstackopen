const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Provide password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.ik96d.mongodb.net/blogList?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  author: "Echo",
  title: "What it takes to become an elite data expert",
  url: "http://dataworld.org/data-experts",
  likes: 400,
});

blog.save().then(() => {
  console.log("Blog post saved");
  mongoose.connection.close;
});
