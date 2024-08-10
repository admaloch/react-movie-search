import image_not_found from '../../../assets/image_not_found.png'
import HoverInfo from '../../../components/Slider/slider-container/HoverInfo';

export default function LikedMovieContent({apiItem, imdbId, isLoading}) {
    return (
        <>
            <img
                src={apiItem.Poster !== 'N/A' ? apiItem.Poster : image_not_found}
                alt={imdbId}
            />
            <HoverInfo
                item={apiItem}
                isLoading={isLoading}
            />
        </>
    )
}
