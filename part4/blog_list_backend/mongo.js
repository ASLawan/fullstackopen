const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Provide password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.ik96d.mongodb.net/testBlogList?retryWrites=true&w=majority&appName=Cluster0`;
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
  author: "Austin",
  title: "Backend testing",
  url: "http://nodebackend/tests",
  likes: 200,
});

blog.save().then(() => {
  console.log("Blog post saved");
  mongoose.connection.close;
});
