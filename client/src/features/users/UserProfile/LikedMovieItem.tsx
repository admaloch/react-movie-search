
import { useSearchType } from "../../../hooks/useSearchType";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import Error from "../../../components/UI/errors/Error";



export default function LikedMovieItem({ imdbId, hasWatched, isWatchedFilter }) {

    console.log(imdbId)

    const { currType } = useSearchType()
    const mainTypeFilter = currType.type


    const { data: movieItem, isSuccess, isLoading, isError, error } = useGetMovieByIdQuery(imdbId);

    const isLoadingg = true

    if (isLoadingg) return <CircleAnimation />;
    if (isError || !movieItem) return <Error text={`Error: ${error.data.message} Check your internet connection and try again.`}/>
    // console.log(movieItem)
    const itemTypeFilter = movieItem.Type

    if (hasWatched && isWatchedFilter === 'notWatched') {
        return
    } else if (!hasWatched && isWatchedFilter === 'watched') {
        return
    } else if (mainTypeFilter === 'Movie' && itemTypeFilter !== 'movie') {
        return
    } else if (mainTypeFilter === 'TV' && itemTypeFilter !== 'series') return

    return (
        <div className="movie-item-container">
            <div className="movie-item">
                <LikedMovieContent
                    key={imdbId}
                    apiItem={movieItem}
                    imdbId={imdbId}
                    isLoading={isLoading}
                />
            </div>
        </div>

    )
}
