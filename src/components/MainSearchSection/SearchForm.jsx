import SearchInput from "./SearchInput";
import SearchList from "./SearchList";



const SearchForm = ({ types }) => {
  const submitHandler = (e) =>{
      e.preventDefault()
  }
    
    return (
        <form id="searchForm" onSubmit={submitHandler}>
            <SearchInput types = {types}/>
            <SearchList/>
        </form>



    )
}
export default SearchForm;