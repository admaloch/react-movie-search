import "./SearchInfo.css"
import { randomColorGen } from '../../utility/utility.js'
import { useTheme } from "../../../store/APIContext"
import ProgressBar from "./ProgressBar"
import { useEffect } from "react"
import { typeTheme } from "../../../store/TypeContext"

const SearchInfo = ({ progBar, isSliderActive, setProgBar, sliderIndex }) => {

    const { currType } = typeTheme()
    

    const { submittedSearch, searchRes } = useTheme()
    // const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)
    let headerStyle = { display: isSliderActive ? 'flex' : 'none' }

    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = searchRes.Search && searchRes.Search.length
            const numOfBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numOfBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex.index] = { id: sliderIndex.index, isActive: true }
            setProgBar(blockArr)
        },
        [submittedSearch, sliderIndex]
    );


    return (

        <div style={headerStyle} className="header-info">
            <h3>{currType.description} about: <span style={spanColor}>{currSearch}</span>
            </h3>
            <ProgressBar
                progBar={progBar}
            />
        </div>
    )
}
export default SearchInfo;