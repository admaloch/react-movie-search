import { useDispatch, useSelector } from "react-redux";
import { setSubmittedSearch } from "../features/movie-api/searchTermSlice"; 

// Create a custom hook to use the types state
export const useSearchTerm = () => {
    const dispatch = useDispatch();
    const {submittedSearch}  = useSelector((state) => state.submittedSearch);

    const searchInputHandler = (searchTerm:string) => {
        dispatch(setSubmittedSearch(searchTerm));
    };

    return {searchInputHandler, submittedSearch };
};