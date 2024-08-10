
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { TypeObj, searchTypeOptions } from "./SearchTypeOptions";
import TypeProviderContextProps from "../../models/TypeProviderContextProps";

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

export default searchTypeSlice.reducer







