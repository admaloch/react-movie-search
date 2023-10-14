import BioOverlay from "./BioOverlay";
import HoverInfo from "./hoverInfo";
import image_not_found from '../../assets/image_not_found.png';

const SliderItem = ({ imdbID, poster }) => {

// const mouseEnterHandler = () =>{
//     useEffect(() => {
//         async function fetchQuote() {
//             const response = await fetch(RANDOM_QUOTE_URL);
//             const jsonResponse = await response.json();
//             const randomQuote = jsonResponse.quote;
//             setQuote(randomQuote)
//             setIsLoading(false)
//         }
//         fetchQuote()
//     }, [])
// }

    return (

        <div className="movie-container" data-id={imdbID}>
            <img 
            src={poster !== 'N/A' ? poster : image_not_found} 
            alt={imdbID}></img>
            <HoverInfo />
            <BioOverlay />

        </div>

    )
}
export default SliderItem;