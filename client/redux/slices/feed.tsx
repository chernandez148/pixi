// redux/feed.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: {},
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
  },
});

export const { setFeed } = feedSlice.actions;

export default feedSlice.reducer;
