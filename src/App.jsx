import './App.css'
import {  useState } from 'react'
import MainSearch from './components/MainSearchSection/MainSearch'
import MainSlider from './components/Slider/MainSlider'
import { ThemeProvider } from './store/APIContext'
import { TypeProvider } from './store/TypeContext'
import Navbar from './components/Navbar/Navbar'






function App() {

  const [isSliderActive, setIsSliderActive] = useState(false)

  const showSlider = () => setIsSliderActive(true)
  const hideSlider = () => setIsSliderActive(false)

  return (
    <TypeProvider>
      <ThemeProvider>
        <Navbar />
        <MainSearch
          isSliderActive={isSliderActive}
          hideSlider={hideSlider}
        />
        <MainSlider
          isSliderActive={isSliderActive}
          showSlider={showSlider}
          hideSlider={hideSlider}
        />
      </ThemeProvider>
    </TypeProvider>
  )
}

export default App
