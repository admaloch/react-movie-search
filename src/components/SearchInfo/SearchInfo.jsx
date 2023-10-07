import "./SearchInfo.css"
import { useTheme } from "../../store/APIContext";
import { randomColorGen } from '../utility/utility.js'

const SearchInfo = ({ types }) => {
    const { submittedSearch } = useTheme()
    const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)
    console.log(currSearch)

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