import { createSlice } from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
    name: 'search-term',
    initialState: { submittedSearch: '' },
    reducers: {
        setSubmittedSearch: (state, action) => {
            const searchInput  = action.payload
            state.submittedSearch = searchInput
        },
        clearSearch: (state, action) => {
            state.submittedSearch = ''
        },
    }
})

export const { setSubmittedSearch, clearSearch } = searchTermSlice.actions

export default searchTermSlice.reducer

