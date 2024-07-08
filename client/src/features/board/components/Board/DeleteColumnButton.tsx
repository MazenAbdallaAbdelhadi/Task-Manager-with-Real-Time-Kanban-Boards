import { Button } from "@/components/ui/button";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/store";
import { Trash } from "lucide-react";

interface Props {
  columnId: string;
}

const DeleteColumnButton: React.FC<Props> = ({ columnId }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openModal({
        type: ModalType.COLUMN_MODAL,
        mode: "DELETE",
        props: { columnId },
      })
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground"
    >
      <Trash size={16} />
      <span className="sr-only">Delete Column</span>
    </Button>
  );
};

export default DeleteColumnButton;
