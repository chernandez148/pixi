import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostByID } from "@/redux/types";

// Redux State for a single post
export interface PostByIDState {
  postByID: PostByID | null; // Holds a single post or null
}

const initialState: PostByIDState = {
  postByID: null, // Initially null, assuming no post is loaded
};

const postByIDSlice = createSlice({
  name: "postByID",
  initialState,
  reducers: {
    // Updates the state with a single post
    setPostByID(state, action: PayloadAction<PostByID>) {
      state.postByID = action.payload;
    },
    // Clears the post from state
    clearPostByID(state) {
      state.postByID = null;
    },
  },
});

export const { setPostByID, clearPostByID } = postByIDSlice.actions;
export default postByIDSlice.reducer;
