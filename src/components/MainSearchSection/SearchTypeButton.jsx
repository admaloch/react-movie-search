import { typeTheme } from "../../store/TypeContext";



const SearchTypeButton = ({ type, isActive }) => {

    const { handleBtnType } = typeTheme()

    return (
        <li
            onClick={() => handleBtnType(type)}
            className={`result-btn ${isActive ? 'active' : ''}`}>
            {type}
        </li>
    )
}
export default SearchTypeButton;