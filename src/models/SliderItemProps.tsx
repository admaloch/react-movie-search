
export default interface SliderItemProps {
    imdbID: string;
    poster: string;
    onTouchStart: (event: React.TouchEvent) => void;
    onTouchEnd: (event: React.TouchEvent) => void;
}