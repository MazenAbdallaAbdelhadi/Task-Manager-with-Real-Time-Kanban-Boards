import { motion } from "framer-motion";
import { BoardList } from "@/features/board";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/store";
import { ModalType, openModal } from "@/features/modal/modalSlice";

interface Props {
  isCollapsed: boolean;
}
const Sidebar: React.FC<Props> = ({ isCollapsed }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(
      openModal({
        type: ModalType.BOARD_MODAL,
        mode: "CREATE",
      })
    );
  };

  return (
    <motion.aside
      className="h-screen flex flex-col border-r overflow-hidden"
      animate={{
        width: isCollapsed ? "0px" : "255px",
      }}
    >
      {/* LOGO */}
      <span className="inline-block border-b w-full px-4 py-3 font-bold text-3xl h-[--header-h]">
        KANBAN
      </span>

      <div>
        <BoardList isCollapsed={isCollapsed} />

        {/* ADD NEW BOARD BUTTON */}
        <div className="px-3 w-[--sidebar-w]">
          {/* <AddBoardButton /> */}
          <Button className="w-full" onClick={handleClick}>
            ADD NEW BOARD
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
