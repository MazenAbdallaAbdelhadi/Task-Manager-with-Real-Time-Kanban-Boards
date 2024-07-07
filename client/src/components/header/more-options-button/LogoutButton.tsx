import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { DropdownMenuItem } from "../../ui/dropdown-menu";

const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() => dispatch(openModal({ type: ModalType.PROFILE_MODAL, mode: "DELETE" }))}
    >
      <LogOut size={18} className="mr-2" />
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
