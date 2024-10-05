// import { useSelector } from "react-redux";
import { useContextValue } from "./helper";

const Notification = () => {
  // const notification = useSelector((state) => state.message);

  const notification = useContextValue();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    // width: 600,
    textAlign: "center",
    marginBottom: 15,
  };

  if (notification) {
    console.log(`Notification: ${notification}`);
  }
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
