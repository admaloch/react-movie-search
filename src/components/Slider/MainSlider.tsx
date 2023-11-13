
import { useEffect, useReducer } from 'react';
import { useAPIContext } from '../../store/APIContext/APIContext';
import ErrorMsg from './ErrorMsg/ErrorMsg';

import React from 'react';
import SearchInfo from './search-info/SearchInfo';
import SliderContainer from './slider-container/SliderContainer';
import { MainSliderProps } from '../../models/SliderProps';


const reducer = (sliderIndex, action) => {
    let newIndexVal = 0
    switch (action.type) {
        case 'updateProgBar':
            return { ...sliderIndex, progBar: action.progBarArr }
        case 'increment':
            sliderIndex.index + 1 > sliderIndex.progBar.length - 1
                ? newIndexVal = 0
                : newIndexVal = sliderIndex.index + 1
            return { ...sliderIndex, index: newIndexVal }
        case 'decrement':
            sliderIndex.index - 1 === - 1
                ? newIndexVal = sliderIndex.progBar.length - 1
                : newIndexVal = sliderIndex.index - 1
            return { ...sliderIndex, index: newIndexVal }
        case 'changeIndex':
            return { ...sliderIndex, index: action.newIndex }
        default:
            return { ...sliderIndex, index: 0 }
    }
}


const MainSlider = ({ isSliderActive, showSlider, hideSlider }: MainSliderProps): JSX.Element => {

    const [sliderIndex, dispatch] = useReducer(reducer, {
        progBar: [],
        index: 0,
    })


    const { apiResults, submittedSearch } = useAPIContext()

    const increaseIndexHandler = () => dispatch({ type: 'increment' })
    const decreaseIndexHandler = () => dispatch({ type: 'decrement' })
    const changeIndexHandler = (newIndex: number) => dispatch({ type: 'changeIndex', newIndex: newIndex })
    const updateProgBarHandler = (progBarArr) => dispatch({ type: 'updateProgBar', progBarArr: progBarArr })

    useEffect(
        function resetIndex() {
            dispatch({ type: 'reset' })
        },
        [submittedSearch]
    )

    useEffect(
        function updateSlider() {
            document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex.index);
        },
        [sliderIndex.index]
    )


    useEffect(
        function hideOnSubmit() {
            if (apiResults.length > 0) {
                showSlider()
            } else {
                hideSlider()
            }
        },
        [submittedSearch]
    )

    console.log(sliderIndex)

    return (
        <>
            <SearchInfo
                progBar={sliderIndex.progBar}
                isSliderActive={isSliderActive}
                setProgBar={updateProgBarHandler}
                sliderIndex={sliderIndex.index}
                changeIndexHandler={changeIndexHandler}
            />
            <SliderContainer
                progBar={sliderIndex.progBar}
                decreaseIndexHandler={decreaseIndexHandler}
                increaseIndexHandler={increaseIndexHandler}
                isSliderActive={isSliderActive}
            />

            <ErrorMsg />


        </>
    )
}
export default MainSlider;