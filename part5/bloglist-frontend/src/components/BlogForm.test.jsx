import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("CreateBlog is called with the right information when a new blog is created", async () => {
  const mockCreateBlog = vi.fn();

  render(<BlogForm createBlog={mockCreateBlog} />);

  const titleInput = screen.getByPlaceholderText("Blog title...");
  const urlInput = screen.getByPlaceholderText("Blog url...");
  const authorInput = screen.getByPlaceholderText("Blog author...");
  const createBlogBtn = screen.getByText("Create Blog");

  const user = userEvent.setup();

  await user.type(titleInput, "Testing React Applications");
  await user.type(urlInput, "www.learnreact.com/tests.html");
  await user.type(authorInput, "Lawan Austin");

  await user.click(createBlogBtn);

  expect(mockCreateBlog).toHaveBeenCalledTimes(1);

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: "Testing React Applications",
    url: "www.learnreact.com/tests.html",
    author: "Lawan Austin",
  });
});
