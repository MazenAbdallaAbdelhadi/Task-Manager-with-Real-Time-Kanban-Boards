import { useDispatch, useSelector } from "react-redux";
import { Edit } from "lucide-react";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { selectSelectedBoard } from "@/features/board/boardSlice";
import { DropdownMenuItem } from "../../ui/dropdown-menu";

const EditBoardButton = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() =>
        dispatch(
          openModal({
            type: ModalType.BOARD_MODAL,
            mode: "UPDATE",
            props: {
              title: selectedBoard?.title,
              description: selectedBoard?.description,
            },
          })
        )
      }
    >
      <Edit size={18} className="mr-2" />
      Edit
    </DropdownMenuItem>
  );
};

export default EditBoardButton;
