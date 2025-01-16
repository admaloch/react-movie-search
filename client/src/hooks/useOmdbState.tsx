import { useDispatch, useSelector } from "react-redux";
import { setOmdbState } from "../features/movie-api/omdbSlice";
import { OmdbItem } from "../models/ItemApiProps";
import { RootState } from "../app/store";

// Create a custom hook to use the types state
export const useOmdbState = () => {
  const dispatch = useDispatch();
  const { submittedSearch, omdbSearchResults } = useSelector(
    (state: RootState) => state.omdbState,
  );
  const updateOmdbState = (searchInput: string, omdbResults: OmdbItem[]) => {
    dispatch(setOmdbState({ searchInput, omdbResults }));
  };

  return { updateOmdbState, submittedSearch, omdbSearchResults };
};
