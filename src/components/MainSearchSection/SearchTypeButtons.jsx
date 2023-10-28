import { typeTheme } from "../../store/TypeContext";
import SearchTypeButton from "./SearchTypeButton";

const SearchTypeButtons = () => {

    const { types } = typeTheme()


    return (

        <ul id="result-type-container">
            {types.map((movieType) => (
                <SearchTypeButton

                    key={movieType.type}
                    type={movieType.type}
                    isActive={movieType.isActive}
                    colorScheme={movieType.colorScheme}

                />
            ))}
        </ul>
    )
}
export default SearchTypeButtons;