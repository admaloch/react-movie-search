import SearchTypeButton from "./SearchTypeButton";

const SearchTypeButtons = () => {
    return (

        <ul id="result-type-container">
    
            <SearchTypeButton type = {'Movies'}/>
            <SearchTypeButton type = {'TV'}/>
            <SearchTypeButton type = {'Both'}/>

        </ul>




    )
}
export default SearchTypeButtons;