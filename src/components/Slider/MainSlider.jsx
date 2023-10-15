
import { useEffect, useState } from 'react';
import { useTheme } from '../../store/APIContext';

import SearchInfo from './search-info/SearchInfo';

import SliderContainer from './slider-container/SliderContainer';

const MainSlider = ({ types }) => {

    const [sliderIndex, setSliderIndex] = useState(0)
    const { searchRes } = useTheme()
    const numItems = searchRes.Search && searchRes.Search.length
console.log(numItems)
    const decreaseIndexHandler = () => {
        setSliderIndex(sliderIndex - 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex - 1);

    }

    const increaseIndexHandler = () => {
        setSliderIndex(sliderIndex + 1)
        let newSliderIndex = null

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