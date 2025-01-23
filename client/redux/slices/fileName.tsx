import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type for file name
export interface FileNameState { 
  fileName: string | null;
}

// Initial state for file name slice
const initialState: FileNameState = {
  fileName: null,
};

// Create the slice for file name
const fileNameSlice = createSlice({
  name: "fileName",
  initialState,
  reducers: {
    // Action to set the file name
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
  },
});

// Export the action and the reducer
export const { setFileName } = fileNameSlice.actions;
export default fileNameSlice.reducer;
