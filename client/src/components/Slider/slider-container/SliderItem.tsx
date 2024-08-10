import React from "react";
import HoverInfo from "./HoverInfo";
import image_not_found from '../../../assets/image_not_found.png';
import { useState } from "react";
import axios from 'axios';
import { useSearchType } from "../../../hooks/useSearchType";
import SliderItemProps from "../../../models/SliderItemProps";
import { APIItem, defaultAPIItem } from "../../../models/ItemApiProps";
import { isMobile } from "react-device-detect"; // Import from react-device-detect

const BASE_URL = 'https://omdbapi.com/?i=';
const api_key = '&apikey=84200d7a';

const SliderItem = ({ imdbID, poster, showArrowFunc, hideArrowFunc }: SliderItemProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)
    const { currType } = useSearchType()
    const searchParam = currType.apiParam;
    const [itemOnHover, setItemOnHover] = useState<APIItem>(defaultAPIItem)



    function mouseEnterHandler() {
        hideArrowFunc();
        fetchData()
    }

    async function fetchData() {
        try {
            const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}${searchParam}&plot=full`);
            console.log(apiRes.data)
            setItemOnHover(apiRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            if (!isMobile) {
                setIsLoading(false)
            } else {
                // this state causes issue on mobile but a slight delay fixes that
                setTimeout(() => setIsLoading(false), 100)
            }
        }
    }


    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={showArrowFunc}
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
