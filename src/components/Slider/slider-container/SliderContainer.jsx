
import Slider from './Slider';




const SliderContainer = ({ types, increaseIndexHandler, decreaseIndexHandler }) => {














    return (

        <div className="slider-container">

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