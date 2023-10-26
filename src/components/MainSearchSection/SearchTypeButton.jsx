import { typeTheme } from "../../store/TypeContext";



const SearchTypeButton = ({ type, isActive }) => {

    const { searchTypeHandler } = typeTheme()

    return (
        <li
            onClick={() => searchTypeHandler(type)}
            className={`result-btn ${isActive ? 'active' : ''}`}>
            {type}
        </li>
    )
}
export default SearchTypeButton;