export default interface ProgressItemProps {
    id: number; 
    isActive: Boolean;
    changeIndexHandler: (newIndex: number) => void;
}