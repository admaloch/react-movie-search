import { useDispatch, useSelector } from "react-redux";
import { setOmdbState } from "../features/movie-api/omdbSlice";

// Create a custom hook to use the types state
export const useOmdbState = () => {
    const dispatch = useDispatch();
    const { submittedSearch, omdbSearchResults } = useSelector((state) => state.omdbState);

    const updateOmdbState = (searchInput: string, omdbResults) => {
        
        dispatch(setOmdbState({searchInput, omdbResults}));

    };

    return { updateOmdbState, submittedSearch, omdbSearchResults };
};