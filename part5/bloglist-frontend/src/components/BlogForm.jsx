import { useState } from "react";
import Notification from "./Notification";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    if (!title || !author || !url) {
      setMessage("All fields are required");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    }

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <Notification message={message} messageType={messageType} />
      <div>
        <h2>Create new Blogpost</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="">Title: </label>
            <input
              type="text"
              name="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title..."
            />
          </div>
          <div>
            <label htmlFor="">Author: </label>
            <input
              type="text"
              name="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Blog author..."
            />
          </div>
          <div>
            <label htmlFor="">Url: </label>
            <input
              type="text"
              name="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Blog url..."
            />
          </div>
          <div>
            <button type="submit">Create Blog</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
