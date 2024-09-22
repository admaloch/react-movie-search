import { useState } from 'react'
import MainSearch from './MainSearchSection/MainSearch'
import MainSlider from './Slider/MainSlider'

function MainPage() {

  const [isSliderActive, setIsSliderActive] = useState(false)
  const showSlider = () => setIsSliderActive(true)
  const hideSlider = () => setIsSliderActive(false)

  return (

       <main className="main-slider-content main-item-content">
         <section className="content-container">
          <MainSearch
            isSliderActive={isSliderActive}/>
          <MainSlider
            isSliderActive={isSliderActive}
            showSlider={showSlider}
            hideSlider={hideSlider}
          />
        </section>
       </main>

  )
}

export default MainPage
