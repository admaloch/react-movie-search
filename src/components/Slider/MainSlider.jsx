
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '../../store/APIContext';

import SearchInfo from './search-info/SearchInfo';
import SliderContainer from './slider-container/SliderContainer';

const MainSlider = ({ types }) => {
    const { searchRes, submittedSearch } = useTheme()
    const [sliderIndex, setSliderIndex] = useState(0)
    const [progBar, setProgBar] = useState([])

    const decreaseIndexHandler = () => {
        let newIndexVal = 0
        sliderIndex - 1 === -1
            ? newIndexVal = progBar.length - 1
            : newIndexVal = sliderIndex - 1
        document.querySelector('.slider').style.setProperty('--slider-index', newIndexVal);
        setSliderIndex(newIndexVal)
    }

    const increaseIndexHandler = () => {
        let newIndexVal = 0
        sliderIndex + 1 > progBar.length - 1
            ? newIndexVal === 0
            : newIndexVal = sliderIndex + 1
        setSliderIndex(newIndexVal)
        document.querySelector('.slider').style.setProperty('--slider-index', newIndexVal);
    }

    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = searchRes.Search && searchRes.Search.length
            const numOfBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numOfBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex] = { id: sliderIndex, isActive: true }
            setProgBar(blockArr)
        },
        [submittedSearch, sliderIndex]
    );

    return (
        <>
            <Search/Info
                progBar={progBar}
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