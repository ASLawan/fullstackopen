import logoutService from "../services/logout";

const LogOut = () => {
  const handleLogout = () => {
    logoutService.logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogOut;
