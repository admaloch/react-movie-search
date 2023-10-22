
import { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { useTheme } from '../../store/APIContext';

import SearchInfo from './search-info/SearchInfo';
import SliderContainer from './slider-container/SliderContainer';

// useReducer not entirely necessary for this but good practice
const reducer = (sliderIndex, action) => {
    let progBar = action.progBar
    let newIndexVal = 0
    switch (action.type) {
        case 'increment':
            sliderIndex.index + 1 > progBar.length - 1
                ? newIndexVal = 0
                : newIndexVal = sliderIndex.index + 1
    }
    switch (action.type) {
        case 'decrement':
            sliderIndex.index - 1 === - 1
                ? newIndexVal = progBar.length - 1
                : newIndexVal = sliderIndex.index - 1
    }
    document.querySelector('.slider').style.setProperty('--slider-index', newIndexVal);
    return { index: newIndexVal }
}

const MainSlider = ({ types }) => {
    const [isSliderActive, setIsSliderActive] = useState(false)
    const [sliderIndex, dispatch] = useReducer(reducer, { index: 0 })
    const [progBar, setProgBar] = useState([])
    const { searchRes, submittedSearch } = useTheme()



    const increaseIndexHandler = () => dispatch({ type: 'increment', progBar: progBar })
    const decreaseIndexHandler = () => dispatch({ type: 'decrement', progBar: progBar })



    useEffect(

        function progressBarFunc() {


            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))


            const numItems = searchRes.Search && searchRes.Search.length
            const numOfBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numOfBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex.index] = { id: sliderIndex.index, isActive: true }
            setProgBar(blockArr)
        },
        [submittedSearch, sliderIndex]
    );

    useEffect(
        function hideOnSubmit() {
            if (searchRes.Response === 'True') {
                setIsSliderActive(true)
            } else {
                setIsSliderActive(false)
            }
        },
        [submittedSearch]
    )



    return (
        <>
            <SearchInfo
                progBar={progBar}
                types={types}
                isSliderActive={isSliderActive}
            />
            <SliderContainer
                types={types}
                decreaseIndexHandler={decreaseIndexHandler}
                increaseIndexHandler={increaseIndexHandler}
                isSliderActive={isSliderActive}
            />
        </>
    )
}
export default MainSlider;