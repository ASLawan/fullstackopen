import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Title.",
  url: "Url",
  likes: 7,
  author: "Author",
  user: { id: "7", name: "TestUser" },
};

const mockUser = { id: "7", token: "mock-token" };
const mockDelete = vi.fn();

test("renders blog title and author", () => {
  render(<Blog blog={blog} currentUser={mockUser} handleDelete={mockDelete} />);

  const element = screen.getByText("Title. Author");
  const urlElement = screen.queryByText("Https: Url");
  const likesElement = screen.queryByText("Likes: 7");

  expect(element).toBeDefined();
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

test("clicking the button displays blog information", async () => {
  const mockdisplayDetails = vi.fn();

  render(<Blog blog={blog} currentUser={mockUser} handleDelete={mockDelete} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  //   expect(mockdisplayDetails).toHaveBeenCalledTimes(1);

  const element = screen.getByText("Title.");
  const urlElement = screen.queryByText("Https: Url");
  const likesElement = screen.queryByText("Likes: 7");
  const authorElement = screen.getByText("Author");

  expect(element).toBeDefined();
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
  expect(authorElement).toBeDefined();
});

test('Clicking the "like button" twice, calls event handler twice'),
  async () => {
    const likeButtonHandler = vi.fn();

    render(
      <Blog blog={blog} currentUser={mockUser} handleDelete={mockDelete} />
    );

    const user = userEvent.setup();
    const viewBtn = screen.getByText("view");
    await user.click(viewBtn);

    const likeBtn = screen.getByText("like");
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeButtonHandler).toHaveBeenCalledTimes(2);
  };
