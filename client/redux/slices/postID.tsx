import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type for file name
export interface PostIDState { 
  postID: number | null;
}

// Initial state for file name slice
const initialState: PostIDState = {
  postID: null,
};

// Create the slice for file name
const postIDSlice = createSlice({
  name: "postID",
  initialState,
  reducers: {
    // Action to set the file name
    setPostID: (state, action: PayloadAction<number>) => {
      state.postID = action.payload;
    },
  },
});

// Export the action and the reducer
export const { setPostID } = postIDSlice.actions;
export default postIDSlice.reducer;
