import  { useEffect } from 'react';
import { useState } from 'react';
import Slider from './Slider';
import './Slider.css'
import SliderContainerProps from '../../../models/SliderContainerProps';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive, progBar }: SliderContainerProps): JSX.Element => {

    const [showArrows, setShowArrows] = useState(true)
    const arrowStyle = { opacity: showArrows ? 1 : 0 }

    const showArrowHandler = () => {
        setShowArrows(true)

    }
    const hideArrowHandler = () => {
        setShowArrows(false)
    }

    const sliderClass = isSliderActive
        ? 'show-slider slider-container'
        : 'remove-slider slider-container'

    useEffect(
        function hideArrowsOnSmallRequests() {
            if (progBar.length > 1) {
                setShowArrows(true)
            } else {
                setShowArrows(false)
            }
        },
        [progBar]
    )

    return (
        <div className={sliderClass}>
            <button
                style={arrowStyle}
                onClick={decreaseIndexHandler}
                className="handle left-handle" >
                <div className="arrow">
                    <ArrowBackIcon className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
            <Slider
                showArrowFunc={showArrowHandler}
                hideArrowFunc={hideArrowHandler}
            />
            <button
                style={arrowStyle}
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div className="arrow">
                    <ArrowForwardIcon className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
        </div >
    )
}

export default SliderContainer;
