import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user'
import postsReducer from './slices/posts'
import fileNameReducer from './slices/fileName';
import selectedImageReducer from './slices/seletecImage';
import accessTokenReducer from './slices/accessToken';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    fileName: fileNameReducer,
    selectedImage: selectedImageReducer,
    accessToken: accessTokenReducer
  },
});

export default store;
