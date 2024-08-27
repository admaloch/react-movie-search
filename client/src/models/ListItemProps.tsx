import { OmdbItem } from "./ItemApiProps"
import LoadingProps from "./LoadingProps";

export interface ModalContentProps {
    item: OmdbItem;
}

export interface ListItemProps extends ModalContentProps, LoadingProps {
    open: Boolean;
    closeModal: () => void;
}