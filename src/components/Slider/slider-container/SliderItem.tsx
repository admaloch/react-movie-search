import React from "react";
import HoverInfo from "./HoverInfo";
import image_not_found from '../../../assets/image_not_found.png';
import { useState } from "react";
import axios from 'axios';
import { useTypeContext } from "../../../store/searchTypeContext/TypeContext";
import SliderItemProps from "../../../models/SliderItemProps";
import { APIItem, defaultAPIItem } from "../../../models/ItemApiProps";

const BASE_URL = 'https://omdbapi.com/?i=';
const api_key = '&apikey=84200d7a';

const SliderItem = ({ imdbID, poster, onTouchStart, onTouchEnd }: SliderItemProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)
    const { searchTypes } = useTypeContext()
    const currItem = searchTypes.filter(item => item.isActive === true)[0]
    const searchParam = currItem.apiParam;
    const [itemOnHover, setItemOnHover] = useState<APIItem>(defaultAPIItem)

    async function mouseEnterHandler() {
        const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}${searchParam}&plot=full`)
        setItemOnHover(apiRes.data)
        setIsLoading(false)
    }

    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="movie-container"
            data-id={imdbID}
        >
            <img
                src={poster !== 'N/A' ? poster : image_not_found}
                alt={imdbID}
            />
            <HoverInfo
                item={itemOnHover}
                isLoading={isLoading}
            />
        </div>
    )
}
export default React.memo(SliderItem);
