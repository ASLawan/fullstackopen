import { useContext } from "react";
import NotificationContext from "../reducers/notificationReducer";

export const useContextValue = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useContextDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};
