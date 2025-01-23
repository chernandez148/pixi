import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/redux/types";

export interface PostState {
  posts: Post[]; 
}

const initialState: PostState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;
