
import { useEffect, useState } from 'react';
import './MainSlider.css'
import SearchInfo from './SearchInfo';

import SliderContainer from './SliderContainer';

const MainSlider = ({ types }) => {

    const [sliderIndex, setSliderIndex] = useState(0)

    const decreaseIndexHandler = () => {
        setSliderIndex(sliderIndex - 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex - 1);
    }

    const increaseIndexHandler = () => {
        setSliderIndex(sliderIndex + 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex + 1);
    }




    return (
        <>
            <SearchInfo
                sliderIndex={sliderIndex}
                types={types}
            />
            <SliderContainer
                types={types}
                decreaseIndexHandler={decreaseIndexHandler}
                increaseIndexHandler={increaseIndexHandler}
            />
        </>
    )
}
export default MainSlider;