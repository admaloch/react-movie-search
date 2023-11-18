import SlidersProps from "./SlidersProps";
import { APIItem } from "./ItemApiProps";
export default interface SliderItemProps extends SlidersProps {
    imdbID: string;
    poster: string;
}