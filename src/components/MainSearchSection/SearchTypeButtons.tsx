import { typeTheme } from "../../store/TypeContext";
import SearchTypeButton from "./SearchTypeButton";
import SliderProps from '../../models/SliderProps'

const SearchTypeButtons = ({ hideSlider }: SliderProps) => {

    const { types } = typeTheme()


    return (

        <ul id="result-type-container">
            {types.map((movieType) => (
                <SearchTypeButton

                    key={movieType.type}
                    type={movieType.type}
                    isActive={movieType.isActive}
                    colorScheme={movieType.colorScheme}
                    hideSlider={hideSlider}
                />
            ))}
        </ul>
    )
}
export default SearchTypeButtons;