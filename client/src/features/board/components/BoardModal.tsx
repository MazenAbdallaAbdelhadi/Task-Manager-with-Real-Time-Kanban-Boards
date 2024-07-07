import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  selectIsOpen,
  selectModalProps,
  ModalType,
  selectModalMode,
} from "@/features/modal/modalSlice";
import AddBoardForm from "./AddBoardForm";
import EditBoardForm from "./EditBoardForm";
import DeleteBoardForm from "./DeleteBoardForm";

interface Props {
  onClose: () => void;
}

const BoardModal: React.FC<Props> = ({ onClose }) => {
  const mode = useSelector(selectModalMode);
  const isOpen = useSelector(selectIsOpen(ModalType.BOARD_MODAL));
  const modalProps = useSelector(selectModalProps);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>BOARD FORM</DialogTitle>
        </DialogHeader>
        {mode === "CREATE" && <AddBoardForm />}
        {mode === "UPDATE" && <EditBoardForm {...modalProps} />}
        {mode === "DELETE" && <DeleteBoardForm />}
      </DialogContent>
    </Dialog>
  );
};

export default BoardModal;
