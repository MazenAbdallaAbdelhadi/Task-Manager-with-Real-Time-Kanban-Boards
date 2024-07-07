import { useMediaQuery } from "usehooks-ts";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedBoard } from "@/features/board/boardSlice";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { Button } from "../ui/button";

const AddTaskButton = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedBoard = useSelector(selectSelectedBoard);

  if (!selectedBoard) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0" }}
    >
      <Button
        size={isMobile ? "icon" : "default"}
        onClick={() =>
          dispatch(
            openModal({
              type: ModalType.TASK_MODAL,
              mode: "CREATE",
              props: { boardId: selectedBoard._id },
            })
          )
        }
      >
        <Plus size={18} className={isMobile ? "" : "mr-2"} />
        {!isMobile && "Add New Task"}
      </Button>
    </motion.div>
  );
};

export default AddTaskButton;
