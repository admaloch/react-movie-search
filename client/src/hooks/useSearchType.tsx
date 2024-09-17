import { useDispatch, useSelector } from "react-redux";
import {setSearchType} from "../features/search-options/SearchTypeSlice";
import { RootState } from "../app/store";
import { SearchType } from "../features/search-options/SearchTypeOptions";

// Create a custom hook to use the types state
export const useSearchType = () => {
    const dispatch = useDispatch();
    const { searchTypes } = useSelector((state: RootState) => state.searchTypes);

    const searchTypeHandler = (typeInput: string) => {
        dispatch(setSearchType(typeInput));
    };

    const currType: SearchType = searchTypes.find(item => item.isActive)

    return { searchTypes, currType, searchTypeHandler };
};