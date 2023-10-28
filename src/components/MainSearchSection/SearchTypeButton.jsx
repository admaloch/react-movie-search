import { typeTheme } from "../../store/TypeContext";



const SearchTypeButton = ({ type, isActive, colorScheme, hideSlider }) => {

    const { searchTypeHandler } = typeTheme()

    const clickHandler = () => {
        searchTypeHandler(type)
        changeColorVars()
        
    }

    const changeColorVars = () => {
        const root = document.querySelector(':root')
        return Object.entries(colorScheme).forEach(v => root.style.setProperty(v[0], v[1]));
    }



    return (
        <li
            onClick={clickHandler}
            className={`result-btn ${isActive ? 'active' : ''}`}>
            {type}
        </li>
    )
}
export default SearchTypeButton;