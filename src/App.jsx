import './App.css'
import { useState } from 'react'
import MainSearch from './components/MainSearchSection/MainSearch'
import MainSlider from './components/Slider/MainSlider'
import { ThemeProvider } from './store/APIContext'
import { TypeProvider } from './store/TypeContext'



function App() {

  const [isSliderActive, setIsSliderActive] = useState(false)

  const showSlider = () => setIsSliderActive(true)
  const hideSlider = () => setIsSliderActive(false)

  return (
    <TypeProvider>
      <ThemeProvider>
        <MainSearch 
        isSliderActive={isSliderActive}
        setIsSliderActive={setIsSliderActive}
        />
        <MainSlider
          isSliderActive={isSliderActive}
          setIsSliderActive={setIsSliderActive}
        />
      </ThemeProvider>
    </TypeProvider>
  )
}

export default App
