
import { useSearchType } from "../../hooks/useSearchType";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../features/movie-api/omdbApiSlice";



export default function LikedMovieItem({ imdbID, hasWatched, isWatchedFilter }) {

    const { currType } = useSearchType()

    const mainTypeFilter = currType.type
    const currItemType = apiItem.Type

    const { data: movieItem, isLoading, isError, error } = useGetMovieByIdQuery(imdbID);

    if (hasWatched && isWatchedFilter === 'notWatched') {
        return
    } else if (!hasWatched && isWatchedFilter === 'watched') {
        return
    } else if (mainTypeFilter === 'Movie' && currItemType !== 'movie') {
        return
    } else if (mainTypeFilter === 'TV' && currItemType !== 'series') return

    return (
        <div className="movie-item-container">
            <div className="movie-item">
                {isLoading
                    ? <CircleAnimation />
                    : <LikedMovieContent
                        apiItem={movieItem}
                        imdbID={imdbID}
                        isLoading={isLoading}
                    />
                }


            </div>

        </div>
    )
}
