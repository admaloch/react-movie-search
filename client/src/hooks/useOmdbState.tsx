import { useDispatch, useSelector } from "react-redux";
import { setOmdbState } from "../features/movie-api/omdbSlice";
import { OmdbItemInterface } from "../models/ItemApiProps";
import { RootState } from "../app/store";

// Create a custom hook to use the types state
export const useOmdbState = () => {
    const dispatch = useDispatch();
    const { submittedSearch, omdbSearchResults } = useSelector(
        (state: RootState) => state.omdbState
    );
    const updateOmdbState = (searchInput: string, omdbResults: OmdbItemInterface) => {
        dispatch(setOmdbState({ searchInput, omdbResults }));
    };

    return { updateOmdbState, submittedSearch, omdbSearchResults };
};