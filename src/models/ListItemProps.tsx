import { APIItem } from "./ItemApiProps"

export interface ModalContentProps {
    item: APIItem | null;
}

export interface ListItemProps extends ModalContentProps {
    open: Boolean;
    closeModal?: () => void;
}