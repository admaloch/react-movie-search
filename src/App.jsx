import MainSearch from './components/MainSearchSection/MainSearch'
import SearchInfo from './components/SearchInfo/SearchInfo'


import './App.css'
import { useState } from 'react'



const searchTypeOptions = [
  {
    type: 'Movie', isActive: true, description: 'Movies', colorScheme: {
      '--text': '#f8f7ff', '--mainBackground': '#022B3A', '--containertext': '#022B3A', '--containerBackground': '#f8f7ff', '--color1': '#ff99c8', '--color2': '#d0f4de', '--color3': '#fdfcdc', '--overlay': 'rgba(248, 247, 255, .8)'
    }
  },
  {
    type: 'TV', isActive: false, description: 'TV Shows', colorScheme: { '--text': '#022B3A', '--mainBackground': '#f7ede2', '--containertext': '#f7ede2', '--containerBackground': '#022B3A', '--color1': '#219ebc', '--color2': '#03045e', '--color3': '#1F7A8C', '--overlay': 'rgba(2, 43, 58, .8)' },
  },
  {
    type: 'Both', isActive: false, description: 'Movies and TV Shows', colorScheme: { '--text': '#284b63', '--mainBackground': '#cbc0d3', '--containertext': '#cbc0d3', '--containerBackground': '#284b63', '--color1': '#c1121f', '--color2': '#023e8a', '--color3': '#1b4332', '--overlay': 'rgba(40, 75, 99, .8)' },
  },
]



function App() {

  const [searchType, setSearchType] = useState(searchTypeOptions)

  const handleBtnType = (type) => {
    updateColorScheme(type)
    updateStateFunc(type)
  }

  const updateStateFunc = (type) => {
    setSearchType((oldType) => {
      return oldType.map((item) => {
        if (item.type === type) {
          return ({ ...item, isActive: true })
        } else {
          return ({ ...item, isActive: false })
        }
      })
    })
  }

  const updateColorScheme = (type) => {
    const currType = searchType.filter(item => item.type === type)
    const currTypeColorScheme = currType[0].colorScheme
    changeColorVars(currTypeColorScheme)
    // fade(sliderContainer, 0, 'none')
    // fade(headerInfo, 0)
    // fade(arrow, 0)
    // searchElement.style.margin = '8rem 0 0 0'
  }



  const changeColorVars = (vars) => {
    const root = document.querySelector(':root')
    return Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
  }


  return (
    <>
      <MainSearch handleBtnType={handleBtnType} types={searchType} />
      <SearchInfo types={searchType}/>
    </>
  )
}

export default App
