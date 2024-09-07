const Notification = ({ message }) => {
  let error;
  if (!message) {
    error = null;
  } else {
    error = message;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
