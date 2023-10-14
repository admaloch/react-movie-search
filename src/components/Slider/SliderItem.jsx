
import HoverInfo from "./hoverInfo";
import image_not_found from '../../assets/image_not_found.png';
import { useState } from "react";
import axios from 'axios';


const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'

const SliderItem = ({ imdbID, poster, types }) => {


    const currItem = types.filter(item => item.isActive === true)[0]
    const searchParam = currItem.apiParam;


    const [itemOnHover, setItemOnHover] = useState({})

    async function mouseEnterHandler() {
        const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}${searchParam}&plot=full`)
        // console.log(apiRes.data.Ratings)
        setItemOnHover(apiRes.data)
    }





    return (

        <div onMouseEnter={mouseEnterHandler} className="movie-container" data-id={imdbID}>
            <img
                src={poster !== 'N/A' ? poster : image_not_found}
                alt={imdbID}></img>
            <HoverInfo item={itemOnHover}/>
            

        </div>

    )
}
export default SliderItem;



    // useEffect(() => {
    //     async function hoverMovieHandler() {
    //         const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}${searchParam}&plot=full`)
    //         console.log(apiRes)
    //     }
    //     hoverMovieHandler()
    // }, [])