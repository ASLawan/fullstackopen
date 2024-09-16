import { useState } from "react";
import axios from "axios";
import blogService from "../services/blogs";

const Blog = ({ blog, handleDelete, currentUser }) => {
  const [details, setDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const likeBlog = async () => {
    try {
      const newLikes = likes + 1;

      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes,
        user: blog.user.id,
      };

      const res = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);

      setLikes(res.data.likes);
    } catch (error) {
      console.log(`Unable to like blog`, error);
    }
  };

  const displayDetails = () => {
    setDetails(!details);
  };

  const deleteBlog = async () => {
    blogService.setToken(currentUser.token);
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        // await axios.delete(`/api/blogs/${blog.id}`);
        handleDelete(blog.id);
      } catch (error) {
        console.log("Unable to delete blog", error);
      }
    }
  };
  return (
    <>
      {details ? (
        <div className="blog">
          <p>
            {blog.title} <button onClick={displayDetails}>hide</button>
          </p>
          <p>Https: {blog.url}</p>
          <p>
            Likes: {likes} <button onClick={likeBlog}>like</button>
          </p>
          <p>{blog.author}</p>
          {/* {console.log(
            `User id: ${blog.user.id}, CurrentUser id: ${currentUser.id}`
          )} */}
          {blog.user.id === currentUser.id ? (
            <button onClick={deleteBlog}>Remove</button>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="blog">
          {blog.title} {blog.author}{" "}
          <button onClick={displayDetails}>view</button>
        </div>
      )}
    </>
  );
};

export default Blog;
