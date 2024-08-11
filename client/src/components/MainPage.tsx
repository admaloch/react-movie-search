import { useState } from 'react'
import MainSearch from './MainSearchSection/MainSearch'
import MainSlider from './Slider/MainSlider'


function MainPage() {

  const [isSliderActive, setIsSliderActive] = useState(false)
  const showSlider = () => setIsSliderActive(true)
  const hideSlider = () => setIsSliderActive(false)

  return (

       
       <div className="main-slider-content">
         <div className="content-container">
          <MainSearch
            isSliderActive={isSliderActive}
            hideSlider={hideSlider}
          />
          <MainSlider
            isSliderActive={isSliderActive}
            showSlider={showSlider}
            hideSlider={hideSlider}
          />
        </div>
       </div>
       
        

  )
}

export default MainPage
