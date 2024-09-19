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
    
    const { currType } = useSearchType();
    const mainTypeFilter = currType.type;

    // Hook call is always executed
    const { data: movieItem, isSuccess, isLoading, isError, error } = useGetMovieByIdQuery(imdbId);

    // Early return if loading
    if (isLoading) {
        return <CircleAnimation />;
    }

    // Early return if there's an error
    if (isError) {
        return (
            //@ts-ignore
            <ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />
        );
    }

    // Ensure movieItem is defined before accessing its properties
    if (isSuccess && movieItem) {
        const itemTypeFilter = movieItem.Type;

        // Check the filter logic to return null if conditions are not met
        if (
            (hasWatched && isWatchedFilter === 'notWatched') ||
            (!hasWatched && isWatchedFilter === 'watched') ||
            (mainTypeFilter === 'Movie' && itemTypeFilter !== 'movie') ||
            (mainTypeFilter === 'TV' && itemTypeFilter !== 'series')
        ) {
            return null;
        }

        return (
            <div className="movie-item-container">
                <div className="movie-item">
                    <LikedMovieContent
                        key={imdbId}
                        apiItem={movieItem}
                        imdbID={imdbId}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        );
    }

    // Return null if no conditions match
    return null;
}
