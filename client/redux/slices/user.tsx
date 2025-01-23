import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}


// Initial state: user is null by default
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Action to log the user out (reset user to null)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setUser, logout } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
