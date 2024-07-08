import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/store";
import { ModalType, openModal } from "@/features/modal/modalSlice";

interface Props {
  columnId: string;
  name: string;
}

const EditColumnButton: React.FC<Props> = ({ columnId, name }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openModal({
        type: ModalType.COLUMN_MODAL,
        mode: "UPDATE",
        props: { columnId, name },
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
      <Edit size={16} />
      <span className="sr-only">Update Column Name</span>
    </Button>
  );
};

export default EditColumnButton;
