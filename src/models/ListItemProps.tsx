import { APIItem } from "./ItemApiProps"
import LoadingProps from "./LoadingProps";

export interface ModalContentProps {
    item: APIItem;
}

export interface ListItemProps extends ModalContentProps, LoadingProps {
    open: Boolean;
    closeModal: () => void;
}