import React from "react";
import HoverInfo from "../../../components/movie-item/HoverInfo";
import image_not_found from '../../../assets/image_not_found.png';
import SliderItemProps from "../../../models/SliderItemProps";
import { useLazyGetMovieByIdQuery } from "../omdbApiSlice";
import { toast } from "react-toastify";

const SliderItem = ({ item, showArrowFunc, hideArrowFunc }: SliderItemProps): JSX.Element => {

    const { imdbID, Poster } = item

    // console.log(item.Poster)


    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();



    if (isError) {
        toast.error(`Error: ${error}`);
    }

    function mouseEnterHandler() {
        hideArrowFunc();
        triggerGetMovieById( imdbID );
    }

    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={showArrowFunc}
            className="movie-container"
            data-id={imdbID}
        >
            <img
                src={Poster !== 'N/A' ? Poster : image_not_found}
                alt={imdbID}
            />
            {movieItem &&
                <HoverInfo
                    item={movieItem}
                    isLoading={isLoading}
                />
            }

        </div>
    )
}
export default React.memo(SliderItem);
