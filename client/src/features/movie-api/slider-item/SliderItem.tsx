import React, { useState } from "react";
import HoverInfo from "../../../components/movie-item/HoverInfo";
import image_not_found from '../../../assets/image_not_found.png';
import { useLazyGetMovieByIdQuery } from "../omdbApiSlice";
import { OmdbItemInterface } from "../../../models/ItemApiProps";
interface SliderItemProps extends OmdbItemInterface {
    showArrowFunc: () => void;
    hideArrowFunc: () => void;
}

const SliderItem = ({ item, showArrowFunc, hideArrowFunc }: SliderItemProps): JSX.Element | null => {

    if (!item) return null

    const { imdbID, Poster } = item
    const [fetchedIds, setFetchedIds] = useState(new Set());

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    function mouseEnterHandler() {
        hideArrowFunc();

        // Check if the imdbID has already been fetched
        if (!fetchedIds.has(imdbID)) {
            triggerGetMovieById(imdbID);
            setFetchedIds(prevIds => new Set(prevIds).add(imdbID));
        }
    }

    return (
        <article
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={showArrowFunc}
            className="movie-container"
            data-id={imdbID}
        >
            <img
                src={Poster !== 'N/A' ? Poster : image_not_found}
                alt={imdbID}
            />
     
                <HoverInfo
                    item={movieItem}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />
            
        </article>
    )
}
export default React.memo(SliderItem);
