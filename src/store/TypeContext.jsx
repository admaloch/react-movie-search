import React, { useContext, useEffect, useState } from "react"
const TypeContext = React.createContext()

const searchTypeOptions = [
    {
        type: 'Movie', isActive: true, description: 'Movies', errorMsg: 'movie', apiParam: "&type=movie", colorScheme: {
            '--text': '#f8f7ff', '--mainBackground': '#022B3A', '--containertext': '#022B3A', '--containerBackground': '#f8f7ff', '--color1': '#ff99c8', '--color2': '#d0f4de', '--color3': '#fdfcdc', '--overlay': 'rgba(248, 247, 255, .8)'
        }
    },
    {
        type: 'TV', isActive: false, description: 'TV Shows', errorMsg: 'tv show', apiParam: "&type=series", colorScheme: { '--text': '#022B3A', '--mainBackground': '#f7ede2', '--containertext': '#f7ede2', '--containerBackground': '#022B3A', '--color1': '#219ebc', '--color2': '#03045e', '--color3': '#1F7A8C', '--overlay': 'rgba(2, 43, 58, .8)' },
    },
    {
        type: 'Both', isActive: false, description: 'Movies and TV Shows', errorMsg: 'movie or tv show', apiParam: "&type=", colorScheme: { '--text': '#284b63', '--mainBackground': '#cbc0d3', '--containertext': '#cbc0d3', '--containerBackground': '#284b63', '--color1': '#c1121f', '--color2': '#023e8a', '--color3': '#1b4332', '--overlay': 'rgba(40, 75, 99, .8)' },
    },
]


export function typeTheme() {
    return useContext(TypeContext)
}

export function TypeProvider({ children }) {

    const [searchTypes, setSearchType] = useState(searchTypeOptions)
    
    const [currType, setCurrType] = useState(searchTypeOptions[0])

    const searchTypeHandler = (typeInput) => {
        setSearchType((oldType) => {
            return oldType.map((item) => {
                if (item.type === typeInput) {
                    return ({ ...item, isActive: true })
                } else {
                    return ({ ...item, isActive: false })
                }
            })
        })
    }

    useEffect(
        function currType() {
            setCurrType(searchTypes.filter(item => item.isActive === true)[0])
        },
        [searchTypes]
    )



    const ctxObj = {
        searchTypeHandler: searchTypeHandler,
        types: searchTypes,
        currType: currType,
    }

    return (
        <TypeContext.Provider value={ctxObj}>
            {children}
        </TypeContext.Provider>
    )
}