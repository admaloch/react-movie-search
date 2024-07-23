import axios from "axios"
import { useEffect, useState } from "react"
import { APIItem, defaultAPIItem } from "../../models/ItemApiProps"
import { useTypeContext } from "../../store/searchTypeContext/TypeContext";

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'

export default function LikedMovieItem({ imdbID, hasWatched, isWatchedFilter }) {

    const { currType } = useTypeContext()
    const [apiItem, setApiItem] = useState<APIItem>(defaultAPIItem)
    const [isLoading, setIsLoading] = useState(true)

    const mainTypeFilter = currType.type
    const currItemType = apiItem.Type

    useEffect(() => {
        async function genApiRes() {
            try {
                const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}&plot=full`)
                // console.log(apiRes.data)
                setApiItem(apiRes.data)
                setIsLoading(false)
            } catch (e) {
                console.log('Api request failed: Error:', e)
            }
        }
        genApiRes()
    }, [])

    if (hasWatched && isWatchedFilter === 'notWatched') {
        return
    } else if (!hasWatched && isWatchedFilter === 'watched') {
        return
    }

    if (mainTypeFilter === 'Movie' && currItemType !== 'movie') return
    else if (mainTypeFilter === 'TV' && currItemType !== 'series') return

    // console.log(apiItem)
    return (
        <div className="movie-item-container">
            <div className="movie-item">
                apiItem={apiItem}
                imdbID={imdbID}
                isLoading={isLoading}
            </div>

        </div>
    )
}
