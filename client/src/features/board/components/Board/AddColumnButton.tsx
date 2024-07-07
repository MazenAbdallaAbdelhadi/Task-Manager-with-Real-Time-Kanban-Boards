import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/store";
import { ModalType, openModal } from "@/features/modal/modalSlice";

const AddCoulumnButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal({ type: ModalType.COLUMN_MODAL, mode: "CREATE" }));
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="w-[300px] flex items-center gap-2"
    >
      <PlusCircle size={18} />
      Column
      <span className="sr-only">Add new Column</span>
    </Button>
  );
};

export default AddCoulumnButton;
