import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { DropdownMenuItem } from "../../ui/dropdown-menu";

const DeleteBoardButton = () => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() =>
        dispatch(
          openModal({
            type: ModalType.BOARD_MODAL,
            mode: "DELETE",
          })
        )
      }
    >
      <Trash size={18} className="mr-2" />
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteBoardButton;
