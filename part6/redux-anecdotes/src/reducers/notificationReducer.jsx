/* eslint-disable react/prop-types */
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = "";
// const notificationSlice = createSlice({
//   name: "notification",
//   initialState,
//   reducers: {
//     notify: (state, action) => {
//       return action.payload;
//     },
//     clearNotification: () => {
//       return null;
//     },
//   },
// });

// export const { notify, clearNotification } = notificationSlice.actions;

// export const displayNotification = (message, notificationTime) => {
//   return (dispatch) => {
//     dispatch(notify(message));

//     setTimeout(() => {
//       dispatch(clearNotification());
//     }, notificationTime * 1000);
//   };
// };
// export default notificationSlice.reducer;

import { createContext, useReducer } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;

    case "CLEAR_NOTIFICATION":
      return "";

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
