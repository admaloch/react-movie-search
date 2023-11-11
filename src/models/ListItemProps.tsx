import APIItem from "./ItemApiProps"

export default interface ListItemProps {
    item: APIItem;
    open: Boolean;
    closeModal?: () => void;
}