import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ModalType,
  selectIsOpen,
  selectModalMode,
  selectModalProps,
} from "@/features/modal/modalSlice";
import { useSelector } from "react-redux";
import AddColumnForm from "./AddColumnForm";
import EditColumnForm from "./EditColumnForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DeleteColumnForm from "./DeleteColumnForm";

interface Props {
  onClose: () => void;
}

const ColumnModal: React.FC<Props> = ({ onClose }) => {
  const mode = useSelector(selectModalMode);
  const isOpen = useSelector(selectIsOpen(ModalType.COLUMN_MODAL));
  const modalProps = useSelector(selectModalProps);

  if (mode === "DELETE")
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Column?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Column.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DeleteColumnForm {...modalProps} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Column FORM</DialogTitle>
        </DialogHeader>
        {mode === "CREATE" && <AddColumnForm />}
        {mode === "UPDATE" && <EditColumnForm {...modalProps} />}
      </DialogContent>
    </Dialog>
  );
};

export default ColumnModal;
