
import { useEffect, useReducer } from 'react';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import React from 'react';
import SearchInfo from './search-info/SearchInfo';
import SliderContainer from './slider-container/SliderContainer';
import ProgBar from '../../models/ProgBar';
import { useOmdbState } from '../../hooks/useOmdbState';

export interface SliderIndexState {
    progBar: ProgBar[];
    index: number;
}
interface IncrementType {
    type: 'increment';
}
interface DecrementType {
    type: 'decrement';
}
interface ChangeIndexType {
    type: 'changeIndex';
    newIndex: number;
}
interface UpdateProgType {
    type: 'updateProgBar';
    progBarArr: ProgBar[];
}
interface MainSliderProps {
    showSlider: () => void;
    isSliderActive: Boolean;
    hideSlider: () => void;
}

type SliderActions = IncrementType| DecrementType| ChangeIndexType| UpdateProgType;

const reducer = (sliderIndex: SliderIndexState, action: SliderActions) => {
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

    const [sliderIndex, dispatch] = useReducer(reducer, { progBar: [], index: 0, })

    const { submittedSearch, omdbSearchResults } = useOmdbState()

    const updateProgBarHandler = (progBarArr: ProgBar[]) => dispatch({ type: 'updateProgBar', progBarArr: progBarArr })
    const increaseIndexHandler = () => dispatch({ type: 'increment' })
    const decreaseIndexHandler = () => dispatch({ type: 'decrement' })
    const changeIndexHandler = (newIndex: number) => dispatch({ type: 'changeIndex', newIndex: newIndex })

    useEffect(
        function updateSlider() {
            const root = document.documentElement;
            const numToString = `${sliderIndex.index}`
            root.style.setProperty('--slider-index', numToString);
        },
        [sliderIndex.index]
    )

    useEffect(
        function hideOnSubmit() {
            changeIndexHandler(0)
            if (omdbSearchResults.length > 0) {
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
                progBar={sliderIndex.progBar}
                isSliderActive={isSliderActive}
                setProgBar={updateProgBarHandler}
                sliderIndex={sliderIndex.index}
                changeIndexHandler={changeIndexHandler}
            />
            <SliderContainer
                decreaseIndexHandler={decreaseIndexHandler}
                increaseIndexHandler={increaseIndexHandler}
                isSliderActive={isSliderActive}
            />
            <ErrorMsg />
        </>
    )
}
export default React.memo(MainSlider);