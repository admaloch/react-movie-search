import './App.css'
import { useState } from 'react'
import MainSearch from './components/MainSearchSection/MainSearch'
import MainSlider from './components/Slider/MainSlider'
import { ThemeProvider } from './store/APIContext'
import { TypeProvider } from './store/TypeContext'



function App() {

  const [isSliderActive, setIsSliderActive] = useState(false)

  return (
    <TypeProvider>
      <ThemeProvider>
        <MainSearch isSliderActive={isSliderActive}/>
        <MainSlider
          isSliderActive={isSliderActive}
          setIsSliderActive={setIsSliderActive}
        />
      </ThemeProvider>
    </TypeProvider>
  )
}

export default App
