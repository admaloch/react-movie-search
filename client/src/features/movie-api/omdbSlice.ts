import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submittedSearch: "",
  omdbSearchResults: [],
};

const omdbSlice = createSlice({
  name: "omdbState",
  initialState,
  reducers: {
    setSubmittedSearch: (state, action) => {
      const searchInput = action.payload;
      state.submittedSearch = searchInput;
    },
    clearSearch: (state) => {
      state.submittedSearch = "";
    },
    setOmdbState: (state, action) => {
      const { searchInput, omdbResults } = action.payload;
      state.submittedSearch = searchInput;
      state.omdbSearchResults = omdbResults;
    },
    clearOmdbSearchResults: (state) => {
      state.omdbSearchResults = [];
    },
  },
});

export const {
  setSubmittedSearch,
  clearSearch,
  clearOmdbSearchResults,
  setOmdbState,
} = omdbSlice.actions;

export default omdbSlice.reducer;
