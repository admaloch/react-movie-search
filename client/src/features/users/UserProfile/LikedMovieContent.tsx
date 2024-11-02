import image_not_found from '../../../assets/image_not_found.png';
import HoverInfo from '../../../components/movie-item/HoverInfo';
import { OmdbItem } from '../../../models/ItemApiProps';

interface LikedMovieContentProps {
    apiItem: OmdbItem;
    imdbID: string;
    isLoading: boolean;
}

export default function LikedMovieContent({ apiItem, imdbID, isLoading }: LikedMovieContentProps): React.JSX.Element|null {
    
    if(!apiItem) return null
    
    return (
        <>
            <img
            width={300}
            height={300}
                src={apiItem.Poster !== 'N/A' ? apiItem.Poster : image_not_found}
                alt={imdbID}
            />
            <HoverInfo
                item={apiItem}
                isLoading={isLoading}
            />
        </>
    )
}
