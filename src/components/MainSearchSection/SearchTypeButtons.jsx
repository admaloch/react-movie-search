import SearchTypeButton from "./SearchTypeButton";

const SearchTypeButtons = ({ types, handleBtnType }) => {

    return (

        <ul id="result-type-container">
            {types.map((movieType) => (
                <SearchTypeButton
                    
                    key={movieType.type}
                    type={movieType.type}
                    isActive={movieType.isActive}
                    handleBtnType={handleBtnType}
                    
                />
            ))}
        </ul>
    )
}
export default SearchTypeButtons;