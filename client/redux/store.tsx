import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import postsReducer from "./slices/posts";
import fileNameReducer from "./slices/fileName";
import selectedImageReducer from "./slices/seletecImage";
import accessTokenReducer from "./slices/accessToken";
import toggleCommentsReducer from "./slices/toggleComment";
import postIDReducer from "./slices/postID";
import postByIDReducer from "./slices/postByID";
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    postByID: postByIDReducer,
    fileName: fileNameReducer,
    selectedImage: selectedImageReducer,
    accessToken: accessTokenReducer,
    toggleComments: toggleCommentsReducer,
    postID: postIDReducer,
  },
});

export default store;
