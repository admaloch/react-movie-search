import React, { useContext, useState } from "react"
const TypeContext = React.createContext()

const searchTypeOptions = [
    {
        type: 'Movie', isActive: true, description: 'Movies', apiParam: "&type=movie", colorScheme: {
            '--text': '#f8f7ff', '--mainBackground': '#022B3A', '--containertext': '#022B3A', '--containerBackground': '#f8f7ff', '--color1': '#ff99c8', '--color2': '#d0f4de', '--color3': '#fdfcdc', '--overlay': 'rgba(248, 247, 255, .8)'
        }
    },
    {
        type: 'TV', isActive: false, description: 'TV Shows', apiParam: "&type=series", colorScheme: { '--text': '#022B3A', '--mainBackground': '#f7ede2', '--containertext': '#f7ede2', '--containerBackground': '#022B3A', '--color1': '#219ebc', '--color2': '#03045e', '--color3': '#1F7A8C', '--overlay': 'rgba(2, 43, 58, .8)' },
    },
    {
        type: 'Both', isActive: false, description: 'Movies and TV Shows', apiParam: "&type=", colorScheme: { '--text': '#284b63', '--mainBackground': '#cbc0d3', '--containertext': '#cbc0d3', '--containerBackground': '#284b63', '--color1': '#c1121f', '--color2': '#023e8a', '--color3': '#1b4332', '--overlay': 'rgba(40, 75, 99, .8)' },
    },
]


export function typeTheme() {
    return useContext(TypeContext)
}

export function TypeProvider({ children }) {
    const [searchType, setSearchType] = useState(searchTypeOptions)
    const handleBtnType = (typeInput) => {
        updateColorScheme(typeInput)
        updateTypeState(typeInput)
    }

    const updateTypeState = (inputType) => {
        setSearchType((oldType) => {
            return oldType.map((item) => {
                if (item.type === inputType) {
                    return ({ ...item, isActive: true })
                } else {
                    return ({ ...item, isActive: false })
                }
            })
        })
    }


    const updateColorScheme = (inputType) => {
        const currType = searchType.filter(item => item.type === inputType)
        const currTypeColorScheme = currType[0].colorScheme
        changeColorVars(currTypeColorScheme)
        // fade(sliderContainer, 0, 'none')
        // fade(headerInfo, 0)
        // fade(arrow, 0)
        // searchElement.style.margin = '8rem 0 0 0'
    }



    const changeColorVars = (input) => {
        const root = document.querySelector(':root')
        return Object.entries(input).forEach(v => root.style.setProperty(v[0], v[1]));
    }

    const ctxObj = {
        handleBtnType: handleBtnType,
        types: searchType,
    }

    return (
        <TypeContext.Provider value={ctxObj}>
            {children}
        </TypeContext.Provider>
    )
}