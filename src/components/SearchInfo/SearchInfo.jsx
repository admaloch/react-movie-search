import "./SearchInfo.css"

import { randomColorGen } from '../utility/utility.js'

const SearchInfo = ({ types }) => {

    const currType = types.filter(item => item.isActive === true)[0]
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    console.log('light or dark text:', lightOrDarkText)
    console.log(currType.type)
    const spanColor = { color: randomColorGen(lightOrDarkText) }


    return (

        <div className="header-info">
            <h3>{currType.description} about: <span style={spanColor}>Dogs</span>
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