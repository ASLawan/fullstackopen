const Notification = ({ message, messageType }) => {
  let notification;
  let classname;

  if (!message) {
    notification = null;
  } else if (message && messageType === "success") {
    notification = message;
    classname = messageType;
  } else if (message && (messageType === "error" || messageType === "delete")) {
    notification = message;
    classname = messageType;
  }

  return (
    <div className={classname}>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
