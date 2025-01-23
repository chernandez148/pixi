import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type for file name
export interface ToggleCommentsState {
  toggleComments: boolean;
}

// Initial state for file name slice
const initialState: ToggleCommentsState = {
  toggleComments: false,
};

// Create the slice for file name
const toggleCommentsSlice = createSlice({
  name: "toggleComments",
  initialState,
  reducers: {
    // Action to set the file name
    setToggleComments: (state, action: PayloadAction<boolean>) => {
      state.toggleComments = action.payload;
    },
  },
});

// Export the action and the reducer
export const { setToggleComments } = toggleCommentsSlice.actions;
export default toggleCommentsSlice.reducer;
