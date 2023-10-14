

import { useEffect, useState } from 'react';
import { useTheme } from '../../store/APIContext';
import './MainSlider.css'
import SliderItem from './SliderItem';



const MainSlider = () => {
    const [sliderRes, setSliderRes] = useState([])
    const { submittedSearch, searchRes } = useTheme()



    useEffect(
        function sliderResHandler() {
            setSliderRes(searchRes.Search)
        },
        [submittedSearch]
    );

    // console.log(sliderRes[0])





    return (

        <div className="slider-container">
            <button className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>

            {sliderRes && sliderRes.map(item => (
                <SliderItem
                    item={item}
                    poster={item.Poster}
                    imdbID={item.imdbID}
                    key={item.imdbID}
                />
            ))}
            <button className="handle right-handle">
                <div className="arrow">›</div>
            </button>

        </div >
    )
}
export default MainSlider;