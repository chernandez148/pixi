import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type for file name
export interface SelectedImageState { 
    selectedImage: string | null;
}

// Initial state for file name slice
const initialState: SelectedImageState = {
  selectedImage: null,
};

// Create the slice for file name
const selectedImageSlice = createSlice({
  name: "selectedImage",
  initialState,
  reducers: {
    // Action to set the file name
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
  },
});

// Export the action and the reducer
export const { setSelectedImage } = selectedImageSlice.actions;
export default selectedImageSlice.reducer;
