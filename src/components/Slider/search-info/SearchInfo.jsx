import "./SearchInfo.css"
import { randomColorGen } from '../../utility/utility.js'
import { useTheme } from "../../../store/APIContext"

import ProgressBar from "./ProgressBar"

const SearchInfo = ({ types, progBar }) => {


    const { submittedSearch } = useTheme()
    const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)







    return (

        <div className="header-info">
            <h3>{currType.description} about: <span style={spanColor}>{currSearch}</span>
            </h3>
            <ProgressBar
                progBar={progBar}
            />

        </div>

    )
}
export default SearchInfo;