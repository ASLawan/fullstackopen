const logout = () => {
  const loggedInUser = window.localStorage.getItem("loggedBlogAppUser");

  if (loggedInUser) {
    // console.log(`Found this: ${loggedInUser}`);

    window.localStorage.clear();

    (window.location.href = "/"), true;
  }
};

export default { logout };
