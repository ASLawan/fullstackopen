const lodash = require("Lodash");

const dummy = (blogs) => {
  return 1;
};

const sayHi = (name) => {
  const greet = `Hi, ${name}`;

  return greet;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.map((blog) => {
    likes += blog.likes;
  });

  return likes;
};

const favoriteBlog = (blogs) => {
  let favBlogLikes = 0;
  let favBlog;
  if (blogs.length === 1) {
    favBlog = blogs[0];
  }

  if (blogs === "[]") {
    favBlog = [];
  }

  blogs.map((blog) => {
    if (blog.likes > favBlogLikes) {
      favBlogLikes = blog.likes;
      favBlog = blog;
    }
  });

  if (favBlogLikes === 0) {
    favBlog = blogs[0];
  }

  return favBlog;
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs === null || blogs.length === 0) {
    return null;
  }

  blogAuthors = lodash.countBy(blogs, "author");

  let blogCount = -1;
  let mostBlogsAuthor = null;

  Object.entries(blogAuthors).forEach(([author, count]) => {
    if (count > blogCount) {
      blogCount = count;
      mostBlogsAuthor = author;
    }
  });

  return {
    author: mostBlogsAuthor,
    blogs: blogCount,
  };
};

const mostLikes = (blogs) => {
  if (!blogs || blogs === null || blogs.length === 0) {
    return null;
  }

  let blogLIkes = -1;
  let favblogger = null;
  let likesByFavBlogger = 0;

  blogs.map((blog) => {
    if (blog.likes > blogLIkes) {
      blogLIkes = blog.likes;
      favblogger = blog.author;
    }
  });

  blogs.map((blog) => {
    if (blog.author === favblogger) {
      likesByFavBlogger += blog.likes;
    }
  });

  //   console.log("Fav Blogger: ", favblogger);
  //   console.log("Most likes: ", mostLIkes);
  //   console.log(`Likes by ${favblogger}: ${likesByFavBlogger}`);
  return {
    author: favblogger,
    likes: likesByFavBlogger,
  };
};

module.exports = {
  dummy,
  sayHi,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
