
import { useSearchType } from "../../../hooks/useSearchType";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import ItemError from "../../../components/UI/errors/ItemError";

interface LikedMovieItemProps {
    imdbId: string;
    hasWatched: boolean;
    isWatchedFilter: string;
}

export default function LikedMovieItem({ imdbId, hasWatched, isWatchedFilter }: LikedMovieItemProps): React.JSX.Element | null {

    const { currType } = useSearchType()

    const mainTypeFilter = currType.type

    const { data: movieItem, isSuccess, isLoading, isError, error } = useGetMovieByIdQuery(imdbId);

    let content

    if (isLoading) content = <CircleAnimation />;

    else if (isError) {
        content =
            //@ts-ignore
            <ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />
    }

    else if (isSuccess) {
        content =
            <LikedMovieContent
                key={imdbId}
                apiItem={movieItem}
                imdbID={imdbId}
                isLoading={isLoading}
            />
    }

    const itemTypeFilter = movieItem && movieItem.Type

    if (!itemTypeFilter ||
        hasWatched && isWatchedFilter === 'notWatched' ||
        !hasWatched && isWatchedFilter === 'watched' ||
        mainTypeFilter === 'Movie' && itemTypeFilter !== 'movie' ||
        mainTypeFilter === 'TV' && itemTypeFilter !== 'series') {
        return null
    }

    return (
        <div className="movie-item-container">
            <div className="movie-item">
                {content}
            </div>
        </div>

    )
}
