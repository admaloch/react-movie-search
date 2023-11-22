import React, { useEffect } from 'react';
import { useState } from 'react';
import Slider from './Slider';
import './Slider.css'
import SliderContainerProps from '../../../models/SliderContainerProps';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive, progBar }: SliderContainerProps): JSX.Element => {

    const [showArrows, setShowArrows] = useState(true)
    const arrowStyle = { opacity: showArrows ? 1 : 0 }


    const handleSliderMouseEnter = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('handle') || target.classList.contains('arrow')) {
            setShowArrows(true);
        } else {
            setShowArrows(false);
        }
    };

    const handleSliderMouseLeave = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.classList.contains('slider-item')) {
            setShowArrows(true);
        }
    };

    const containerStyle = isSliderActive
        ? { opacity: 1, height: 'auto' }
        : { opacity: 0, height: '0' }

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

        <div

            style={containerStyle}
            className="slider-container">
            <button
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}
                style={arrowStyle}
                onClick={decreaseIndexHandler}
                className="handle left-handle " >
                <div className="arrow">
                    <ArrowBackIcon className='arrow-icon' sx={{fontSize: '3rem'}}/>
                </div>
            </button>
            <Slider
                mouseLeave={handleSliderMouseLeave}
                mouseEnter={handleSliderMouseEnter}
            />
            <button
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}
                style={arrowStyle}
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div className="arrow">
                    <ArrowForwardIcon className='arrow-icon' sx={{fontSize: '3rem'}}/>
                </div>
            </button>
        </div >
    )
}
export default SliderContainer;