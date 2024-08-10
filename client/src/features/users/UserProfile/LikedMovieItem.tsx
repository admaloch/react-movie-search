import axios from "axios"
import { useEffect, useState } from "react"
import { APIItem, defaultAPIItem } from "../../../models/ItemApiProps"
import { useTypeContext } from "../../../store/searchTypeContext/TypeContext";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'

export default function LikedMovieItem({ imdbId, hasWatched, isWatchedFilter }) {

    const { currType } = useTypeContext()
    const [apiItem, setApiItem] = useState<APIItem>(defaultAPIItem)
    const [isLoading, setIsLoading] = useState(true)

    const mainTypeFilter = currType.type
    const currItemType = apiItem.Type

    useEffect(() => {
        async function genApiRes() {
            try {
                const apiRes = await axios.get(`${BASE_URL}${imdbId}${api_key}&plot=full`)
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
    } else if (mainTypeFilter === 'Movie' && currItemType !== 'movie') {
        return
    } else if (mainTypeFilter === 'TV' && currItemType !== 'series') return

    return (
        <div className="movie-item-container">
            <div className="movie-item">
                {isLoading
                    ? <CircleAnimation />
                    : <LikedMovieContent
                        apiItem={apiItem}
                        imdbId={imdbId}
                        isLoading={isLoading}
                    />
                }


            </div>

        </div>
    )
}
