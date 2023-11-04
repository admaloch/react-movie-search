import "./SearchInfo.css"
import { randomColorGen } from '../../utility/utility.js'
import { useTheme } from "../../../store/APIContext"
import ProgressBar from "./ProgressBar"
import { useEffect } from "react"
import { typeTheme } from "../../../store/TypeContext"

const SearchInfo = ({ progBar, isSliderActive, setProgBar, sliderIndex }) => {

    const { currType } = typeTheme()


    const { submittedSearch, apiResults } = useTheme()
    // const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)


    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = apiResults.length > 0 && apiResults.length
            const numOfBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numOfBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex] = { id: sliderIndex, isActive: true }
            setProgBar(blockArr)
            console.log('sliderIndex', sliderIndex, 'progBar', progBar)

        },
        [submittedSearch, sliderIndex]
    );


    return (

        <div style={{ opacity: isSliderActive ? 1 : 0 }} className="header-info">
            <h2>{currType.description} about: <span style={spanColor}>{currSearch}</span>
            </h2>
            <ProgressBar
                progBar={progBar}
            />
        </div>
    )
}
export default SearchInfo;