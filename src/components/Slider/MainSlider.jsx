
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '../../store/APIContext';

import SearchInfo from './search-info/SearchInfo';

import SliderContainer from './slider-container/SliderContainer';

const MainSlider = ({ types }) => {
    const { searchRes, submittedSearch } = useTheme()
    const [sliderIndex, setSliderIndex] = useState(0)
    const [progBar, setProgBar] = useState([])

    // console.log(progBar)
    const decreaseIndexHandler = () => {
        let newSliderIndex = 0
        if(sliderIndex === 0) {
            newSliderIndex === progBar.length - 1
        } else {
            newSliderIndex = sliderIndex - 1
        }
        setSliderIndex(sliderIndex - 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex - 1);

    }

    const increaseIndexHandler = () => {
        setSliderIndex(sliderIndex + 1)
        let newSliderIndex = null
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex + 1);
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



    console.log(progBar)



    return (
        <>
            <SearchInfo
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