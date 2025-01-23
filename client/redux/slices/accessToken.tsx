import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type for file name
export interface AccessTokenState {  
  accessToken: string | null;
}

// Initial state for file name slice
const initialState: AccessTokenState = {
    accessToken: null,
};

// Create the slice for file name
const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    // Action to set the file name
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Export the action and the reducer
export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
