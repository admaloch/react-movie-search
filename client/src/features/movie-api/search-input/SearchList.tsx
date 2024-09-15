import SearchListItem from "./SearchListItem";
import React, { useEffect } from "react";
import { SmallOmdbItem } from "../../../models/ItemApiProps";

interface SearchListProps {
    isListShown: boolean;
    hideList: () => void;
    movieItems: SmallOmdbItem[]
}

const SearchList = ({ isListShown, hideList, movieItems }: SearchListProps): React.JSX.Element | null => {

    if (!movieItems?.length) return null
    useEffect(() => {
        //handle clicking off screen and certain reserved items to prevent dropdown list from being closed at awkward times
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            const excludeClasses = ['form-control', 'result-btn', 'modal-overlay'];
            const excludeParentClass = 'modal-container';
            const isExcluded = excludeClasses.some(className => target.classList.contains(className));
            const isWithinExcludedParent = target.closest(`.${excludeParentClass}`);
            const isInsideList = document.getElementById('search-list')?.contains(target);
            if (!isExcluded && !isWithinExcludedParent && !isInsideList) {
                hideList();
            }
        }
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('scroll', hideList);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('scroll', hideList);
        };
    }, [hideList]);

    return (
        <ul style={{ height: isListShown ? "300px" : "0", opacity: isListShown ? 1 : 0 }}
            className="search-list"
            id="search-list">

            {movieItems?.map((item) => (
                <SearchListItem
                    key={item.imdbID}
                    imdbID={item.imdbID}
                    Poster={item.Poster}
                    Title={item.Title}
                    Year={item.Year}
                    Type={item.Type}
                />
            ))}
        </ul>
    )
}
export default React.memo(SearchList);

