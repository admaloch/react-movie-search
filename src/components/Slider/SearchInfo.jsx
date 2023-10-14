import "./SearchInfo.css"
import { randomColorGen } from '../utility/utility.js'
import { useTheme } from "../../store/APIContext"
import { useEffect } from "react"
import { useState } from "react"

const SearchInfo = ({ types, sliderIndex }) => {

    const [numProgBar, setNumProgBar] = useState(0)
    const { submittedSearch, searchRes } = useTheme()
    const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)

    


    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = searchRes.length
            setNumProgBar(numItems / itemsPerScreen)
        },
        [submittedSearch]
    );
    console.log(numProgBar)

    return (

        <div className="header-info">
            <h3>{currType.description} about: <span style={spanColor}>{currSearch}</span>
            </h3>
            <div className="progress-bar">
                <div className="progress-item active"></div>
                <div className="progress-item"></div>
                <div className="progress-item"></div>
                <div className="progress-item"></div>

            </div>

        </div>

    )
}
export default SearchInfo;