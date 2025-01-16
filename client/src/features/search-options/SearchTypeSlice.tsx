import { createSlice } from "@reduxjs/toolkit";
import { searchTypeOptions } from "./SearchTypeOptions";

// Create a slice for managing search types
const searchTypeSlice = createSlice({
  name: "search-types",
  initialState: {
    searchTypes: searchTypeOptions,
  },
  reducers: {
    setSearchType: (state, action) => {
      const typeInput = action.payload;
      state.searchTypes = state.searchTypes.map((item) => ({
        ...item,
        isActive: item.type === typeInput,
      }));
    },
  },
});

// Export actions
export const { setSearchType } = searchTypeSlice.actions;

export default searchTypeSlice.reducer;
