import { useSelector } from "react-redux";
import { MoreVertical } from "lucide-react";
import { selectSelectedBoard } from "@/features/board/boardSlice";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import EditBoardButton from "./EditBoardButton";
import DeleteBoardButton from "./DeleteBoardButton";
import ShowProfileButton from "./ShowProfileButton";
import LogoutButton from "./LogoutButton";

const MoreOptionsButton = () => {
    const selectedBoard = useSelector(selectSelectedBoard);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <MoreVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {selectedBoard && (
          <>
            <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* BOARD ACTIONS */}
            <DropdownMenuGroup>
              <EditBoardButton />

              <DeleteBoardButton />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        {/* PORFILE OPTIONS */}
        <DropdownMenuGroup>
          <ShowProfileButton />

          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptionsButton;
