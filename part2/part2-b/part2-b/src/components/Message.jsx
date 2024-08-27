/* eslint-disable react/prop-types */
import "../index.css";

const Message = ({ message, messageType }) => {
  let msg;

  console.log("Message type:", messageType);
  console.log("Message:", message);
  if (!message) {
    msg = null;
  } else {
    msg = message;
  }
  return <div className={messageType}>{msg}</div>;
};

export default Message;
