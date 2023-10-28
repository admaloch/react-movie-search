
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
            break;
        case 'decrement':
            sliderIndex.index - 1 === - 1
                ? newIndexVal = progBar.length - 1
                : newIndexVal = sliderIndex.index - 1
            break;
        default:
            newIndexVal = 0
    }

    document.querySelector('.slider').style.setProperty('--slider-index', newIndexVal);
    return { index: newIndexVal }
}

const MainSlider = ({ isSliderActive, showSlider, hideSlider }) => {

    const [sliderIndex, dispatch] = useReducer(reducer, { index: 0 })
    const [progBar, setProgBar] = useState([])
    const { apiResults, submittedSearch } = useTheme()

    const increaseIndexHandler = () => dispatch({ type: 'increment', progBar: progBar })
    const decreaseIndexHandler = () => dispatch({ type: 'decrement', progBar: progBar })

    useEffect(
        function resetIndex() {
            dispatch({ type: 'reset' })
        },
        [submittedSearch]
    )

    useEffect(
        function hideOnSubmit() {
            if (apiResults.Response === 'True') {
                showSlider()
            } else {
                hideSlider()
            }
        },
        [submittedSearch]
    )


    return (
        <>
            <SearchInfo
                progBar={progBar}

                isSliderActive={isSliderActive}
                setProgBar={setProgBar}
                sliderIndex={sliderIndex}
            />
            <SliderContainer

                decreaseIndexHandler={decreaseIndexHandler}
                increaseIndexHandler={increaseIndexHandler}
                isSliderActive={isSliderActive}
            />
        </>
    )
}
export default MainSlider;