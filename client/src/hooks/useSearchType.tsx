import { useDispatch, useSelector } from "react-redux";
import {setSearchType} from "../features/search-options/SearchTypeSlice";

// Create a custom hook to use the types state
export const useSearchType = () => {
    const dispatch = useDispatch();
    const { searchTypes } = useSelector((state) => state.searchTypes);

    const searchTypeHandler = (typeInput) => {
        dispatch(setSearchType(typeInput));
    };

    const currType = searchTypes.find(item => item.isActive)

    return { searchTypes, currType, searchTypeHandler };
};