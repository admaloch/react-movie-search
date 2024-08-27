import { OmdbItem } from "./ItemApiProps"
import LoadingProps from "./LoadingProps";

export interface ModalContentProps {
    item: OmdbItem | null;
}

export interface ListItemProps extends ModalContentProps, LoadingProps {
    open: Boolean;
    closeModal: () => void;
}