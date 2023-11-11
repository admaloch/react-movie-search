import { useTheme } from "../../store/APIContext/APIContext";
import { typeTheme } from "../../store/searchTypeContext/TypeContext";
import {SearchTypeBtnProps} from "../../models/SliderProps";



const SearchTypeButton = ({ type, isActive, colorScheme, hideSlider }: SearchTypeBtnProps): JSX.Element => {

    const { searchTypeHandler } = typeTheme()
    const { updateSearchState } = useTheme()


    const clickHandler = () => {
        searchTypeHandler(type)
        changeColorVars()
        hideSlider()
        updateSearchState('')
    }

    // use vanilla to change root css color scheme
    const changeColorVars = () => {
        const root = document.querySelector(':root')
        console.log(Object.entries(colorScheme).forEach(v => root.style.setProperty(v[0], v[1])))
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