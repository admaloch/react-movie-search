import image_not_found from '../../assets/image_not_found.png';
import HoverInfo from '../Slider/slider-container/HoverInfo';

export default function LikedMovieContent({apiItem, imdbID, isLoading}) {
    return (
        <>
            <img
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