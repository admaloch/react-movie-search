import React from 'react'
import './App.css'
import { useState } from 'react'
import MainSearch from './components/MainSearchSection/MainSearch'
import MainSlider from './components/Slider/MainSlider'
import { APIProvider } from './store/APIContext/APIContext'
import { TypeProvider } from './store/searchTypeContext/TypeContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {

  const [isSliderActive, setIsSliderActive] = useState(false)
  const showSlider = () => setIsSliderActive(true)
  const hideSlider = () => setIsSliderActive(false)

  return (
    <TypeProvider>
      <APIProvider>
        <Navbar />
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

        <Footer />
      </APIProvider>
    </TypeProvider>
  )
}

export default App
