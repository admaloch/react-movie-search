import axios from "axios"
import { useEffect, useState } from "react"
import { APIItem, defaultAPIItem } from "../../models/ItemApiProps"
import HoverInfo from "../Slider/slider-container/HoverInfo"
import image_not_found from '../../assets/image_not_found.png';

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'

export default function LikedMovieItem({ imdbID, hasWatched }) {
    // console.log(imdbID, hasWatched)

    const [apiItem, setApiItem] = useState<APIItem>(defaultAPIItem)
    const [isLoading, setIsLoading] = useState(true)
    // const [isModalOpen, setIsModalOpen] = useState(false)



    useEffect(() => {
        async function genApiRes() {
            try {
                const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}&plot=full`)
                console.log(apiRes.data)
                setApiItem(apiRes.data)
                setIsLoading(false)
            } catch (e) {
                console.log('Api request failed: Error:', e)
            }
        }
        genApiRes()
    }, [])

    // console.log(apiItem)
    return (
        <div className="movie-item-container">
            <div className="movie-item">
                <img
                    src={apiItem.Poster !== 'N/A' ? apiItem.Poster : image_not_found}
                    alt={imdbID}
                />
                <img src={apiItem.Poster} alt={`${apiItem.Title}-movie-poster`} />
                <HoverInfo
                    item={apiItem}
                    isLoading={isLoading}
                />
            </div>

        </div>
    )
}
