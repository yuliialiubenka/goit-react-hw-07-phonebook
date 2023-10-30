import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    // Update the filter value based on the passed action
    changeFilter: (state, action) => (state = action.payload),
  },
});

// Exporting a changeFilter action from a slice filter
export const { changeFilter } = filterSlice.actions;

// Export the filter reducer from the slice filter
export const filterReducer = filterSlice.reducer;