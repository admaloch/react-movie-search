


const SearchForm = () => {
    return (


        <form id="searchForm">
            <input type="text" className="form-control" placeholder="Movie Title..."
                autoComplete="off" name="query"
                id="search-input" onKeyUp="findMovies()" onClick="findMovies()" />
            <button>Search</button>
            <div className="search-list" id="search-list"></div>
        </form>



    )
}
export default SearchForm;