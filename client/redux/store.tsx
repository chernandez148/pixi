import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import feedReducer from "./slices/feed";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
