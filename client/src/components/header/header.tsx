import SidebarToggle from "./SidebarToggle";
import BoardTitle from "./BoardTitle";
import AddTaskButton from "./AddTaskButton";
import MoreOptionsButton from "./more-options-button/MoreOptionsButton";

interface Props {
  toggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="border-b py-3 px-2 flex gap-2 items-center justify-between h-[--header-h]">
      <div className="flex items-center gap-2">
        <SidebarToggle toggleSidebar={toggleSidebar} />
        <BoardTitle />
      </div>

      <div className="flex items-center gap-2">
        <AddTaskButton />
        <MoreOptionsButton />
      </div>
    </div>
  );
};

export default Header;
