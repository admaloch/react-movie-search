import { APIItem } from "./ItemApiProps"

export interface ModalContentProps {
    item: APIItem;
}

export interface ListItemProps extends ModalContentProps {
    open: Boolean;
    closeModal: () => void;
}