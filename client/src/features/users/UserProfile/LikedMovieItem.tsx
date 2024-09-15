
import { useSearchType } from "../../../hooks/useSearchType";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import ItemError from "../../../components/UI/errors/ItemError";
import MainLoadAnimation from "../../../components/UI/LoadAnimation/MainLoadAnimation";

export default function LikedMovieItem({ imdbId, hasWatched, isWatchedFilter }) {

    // console.log(imdbId)

    const { currType } = useSearchType()
    const mainTypeFilter = currType.type

    const { data: movieItem, isSuccess, isLoading, isError, error } = useGetMovieByIdQuery(imdbId);

    let content

    if (isLoading) content = <CircleAnimation />;

    else if (isError) {
        content =
            <ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />
    }

    else if (isSuccess) {
        content =
            <LikedMovieContent
                key={imdbId}
                apiItem={movieItem}
                imdbId={imdbId}
                isLoading={isLoading}
            />
    }

    // if (!movieItem) return null

    const itemTypeFilter = movieItem && movieItem.Type
    if (!itemTypeFilter) return null
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
                {content}
            </div>
        </div>

    )
}
