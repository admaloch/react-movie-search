

const SearchTypeButton = ({ type, isActive, handleBtnType }) => {



    return (
        <li
            onClick={() => handleBtnType(type)}
            className={`result-btn ${isActive ? 'active' : ''}`}>
            {type}
        </li>
    )
}
export default SearchTypeButton;