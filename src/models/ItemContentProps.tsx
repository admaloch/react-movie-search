import { ModalContentProps } from "./ListItemProps";

export default interface ItemContentProps extends ModalContentProps {
    openItemModal: () => void;
}