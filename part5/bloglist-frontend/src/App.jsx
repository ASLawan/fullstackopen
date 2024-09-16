import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LogOut from "./components/LogOut";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [blog, setNewBlog] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // keep logged in user, logged
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);

  // create blog post
  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObj).then((createdBlog) => {
      setBlogs(blogs.concat(createdBlog));
      setMessage(`${blogObj.title}! by ${blogObj.author} added`);
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    });
  };

  // update blog
  const likeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);

    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService.update(id, updatedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id === id ? blog : returnedBlog)));
    });
  };

  // delete blog
  const handleDelete = (id) => {
    blogService.delBlog(id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMessage(`Blog with id: '${id}' successfully  Deleted!`);
      setMessageType("deleted");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    });
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`Logging in with ${username} and ${password}`);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      console.log(`User id: ${user.id}`);
      setUser(user);
      console.log(`Logged in user: ${user.username}`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Invalid user credentials");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      setUsername("");
      setPassword("");
    }
  };

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="username">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="logn_btn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );

  const blogForm = () => {
    return (
      <Togglable buttonLable="Create Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      {!user && loginForm()}
      {user && (
        <>
          <div>
            <p>
              Welcome{" "}
              {user.username.charAt().toUpperCase() + user.username.slice(1)}
            </p>
            <p>
              <LogOut />
            </p>
          </div>
          <div>{blogForm()}</div>
          <div>
            <h2>Blogs</h2>
          </div>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleDelete={handleDelete}
                currentUser={user}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
