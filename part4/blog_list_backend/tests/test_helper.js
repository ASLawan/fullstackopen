const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Testing node Applications",
    author: "Lawan",
    url: "http://dataworld.org/data-experts",
    likes: 300,
  },
  {
    title: "Backend testing",
    author: "Austin",
    url: "http://nodebackend/tests",
    likes: 200,
  },
];

// const nonExistingId = async () => {
//   const note = new Note({ content: "willremovethissoon" });
//   await note.save();
//   await note.deleteOne();

//   return note.id.toString();
// };

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
