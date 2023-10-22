import Slider from './Slider';
import './Slider.css'
const SliderContainer = ({ types, increaseIndexHandler, decreaseIndexHandler, isSliderActive }) => {


    let sliderStyle = { display: isSliderActive ? 'flex' : 'none' }

    return (

        <div style={sliderStyle} className="slider-container">
            <button onClick={decreaseIndexHandler} className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>
            <Slider types={types} />
            <button onClick={increaseIndexHandler} className="handle right-handle">
                <div className="arrow">›</div>
            </button>
        </div >
    )
}
export default SliderContainer;