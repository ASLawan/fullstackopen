import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LogOut from "./components/LogOut";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

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

      console.log(`User: ${user}`);
      setUser(user);
      console.log(`Logged in user: ${user.username}`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMsg("Invalid user credentials");
      setTimeout(() => {
        setErrorMsg(null);
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

  return (
    <div>
      <Notification message={errorMsg} />
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
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
